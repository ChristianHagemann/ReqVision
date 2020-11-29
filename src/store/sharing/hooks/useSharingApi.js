import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {get} from 'lodash';

import {useSharingOptions} from './useSharingOptions';
import {useGitlabSettings} from '../../settings/hooks/useGitlabSettings';
import {useAsanaSettings} from '../../settings/hooks/useAsanaSettings';
import {useResultsMap} from '../../results/hooks/useResultsMap';
import {useEditResultElement} from '../../results/hooks/useEditResultElement';
import {clearSharingOptions} from '../../sharing/sharingActions';
import {useNotification} from '../../../utils/hooks/useNotification';
import {useSelectedIssue} from './useSelectedIssue';
import {useFormatRequest} from '../../../utils/hooks/useFormatRequest';
import {
	ASANA_API,
	ASANA_COMMENT,
	ASANA_TASKS,
	GITLAB_API,
	GITLAB_COMMENTS,
	GITLAB_ISSUES,
	GITLAB_UPLOADS,
	RESULT_STATUS,
	SHARING_STRINGS,
	TYPES,
} from '../../../utils/consts';


/**
 *
 */
export const useSharingApi = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const {showSuccess, showError} = useNotification();
	const {platform, operation} = useSharingOptions();
	const {selectedIssue} = useSelectedIssue();
	const {setLineBreaks, getFirstWord} = useFormatRequest();

	const [sharingLoading, setLoading] = useState(false);

	const {asToken, asProjectID} = useAsanaSettings();
	const {glToken, glLocation, glProjectID} = useGitlabSettings();

	let sharingQueue = useSelector((state) => state.sharing.sharingQueue);
	const {results} = useResultsMap();

	const {editStatus} = useEditResultElement();

	function startSharing(k) {
		setLoading(true);
		const key = k ? k : sharingQueue[0];
		const object = get(results, key);

		switch (platform.value) {
			case SHARING_STRINGS.ASANA:
				if (operation.value === SHARING_STRINGS.NEW) {
					createAsanaTask(asToken, asProjectID, key, object).then(
						(promise) => {},
					);
				} else if (operation.value === SHARING_STRINGS.COMMENT) {
					commentAsanaTask(asToken, selectedIssue.value, key, object).then(
						(promise) => {},
					);
				}
				break;

			case SHARING_STRINGS.GITLAB:
				if (object.type === TYPES.IMAGE) {
					uploadGitLabImage(glToken, glLocation, glProjectID, object.source, {
						text: object.text,
						title: object.title,
						issueID: selectedIssue ? selectedIssue.value : '',
					}).then((markdown) => {
						if (operation.value === SHARING_STRINGS.NEW) {
							createGitlabIssue(glToken, glLocation, glProjectID, key, {
								title: TYPES.IMAGE,
								text: markdown,
							}).then((promise) => {});
						} else if (operation.value === SHARING_STRINGS.COMMENT) {
							commentGitlabIssue(
								glToken,
								glLocation,
								glProjectID,
								selectedIssue.value,
								key,
								{text: markdown},
							).then((promise) => {});
						}
					});
				} else if (object.type === TYPES.TEXT) {
					if (operation.value === SHARING_STRINGS.NEW) {
						createGitlabIssue(
							glToken,
							glLocation,
							glProjectID,
							key,
							object,
						).then((promise) => {});
					} else if (operation.value === SHARING_STRINGS.COMMENT) {
						commentGitlabIssue(
							glToken,
							glLocation,
							glProjectID,
							selectedIssue.value,
							key,
							object,
						).then((promise) => {});
					}
				}
				break;
		}
	}

	/**
	 *
	 */
	function nextQueueElement() {
		sharingQueue = sharingQueue.slice(1);
		if (sharingQueue.length > 0) {
			startSharing();
		} else {
			dispatch(clearSharingOptions());
			setLoading(false);
		}
	}

	/**
	 * creating a new task in asana
	 */
	async function createAsanaTask(accessToken, projectID, key, task) {
		try {
			axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			axios.defaults.headers.common.Accept = 'application/json';
			const fullUrl = ASANA_API + ASANA_TASKS;
			const body = {
				data: {
					name: task.title ? task.title : getFirstWord(task.text),
					notes: task.text,
					projects: [projectID],
				},
			};
			axios.post(fullUrl, body).then((resp) => {
				editStatus(
					key,
					resp.status === 201
						? RESULT_STATUS.UPLOADED
						: RESULT_STATUS.UPLOAD_ERROR,
				);
				showSuccess(t('SUCCESS_NEW_ISSUE'));
				nextQueueElement();
			});
		} catch (error) {
			editStatus(key, RESULT_STATUS.UPLOAD_ERROR);
			showError(t('ERROR_NEW_TASK'));
			nextQueueElement();
		}
	}

	/**
	 * commenting on an existing task in asana
	 */
	async function commentAsanaTask(accessToken, taskID, key, comment) {
		try {
			axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			axios.defaults.headers.common.Accept = 'application/json';
			const fullUrl = ASANA_API + ASANA_TASKS + '/' + taskID + ASANA_COMMENT;
			const body = {
				data: {
					text: comment.text,
				},
			};
			const resp = await axios.post(fullUrl, body);
			editStatus(
				key,
				resp.status === 201
					? RESULT_STATUS.UPLOADED
					: RESULT_STATUS.UPLOAD_ERROR,
			);
			showSuccess(t('SUCCESS_COMMENT_ISSUE'));
			nextQueueElement();
		} catch (error) {
			editStatus(key, RESULT_STATUS.UPLOAD_ERROR);
			showError(t('ERROR_COMMENTING'));
			nextQueueElement();
		}
	}

	/**
	 * create a new gitlab issue
	 */
	async function createGitlabIssue(
		accessToken,
		repositoryLocation,
		projectID,
		key,
		issue,
	) {
		try {
			axios.defaults.headers.common['PRIVATE-TOKEN'] = accessToken;
			let fullUrl =
				repositoryLocation.replace(/\/$/, '') +
				GITLAB_API +
				projectID +
				GITLAB_ISSUES +
				'?title=';
			if (issue.title) {
				const title = setLineBreaks(encodeURIComponent(issue.title));
				fullUrl = fullUrl + title + '&';
			} else {
				fullUrl = fullUrl + encodeURIComponent(getFirstWord(issue.text)) + '&';
			}
			if (issue.text) {
				const description = setLineBreaks(encodeURIComponent(issue.text));
				fullUrl = fullUrl + 'description=' + description + '&';
			}
			const resp = await axios.post(fullUrl);
			editStatus(
				key,
				resp.status === 201
					? RESULT_STATUS.UPLOADED
					: RESULT_STATUS.UPLOAD_ERROR,
			);
			showSuccess(t('SUCCESS_NEW_ISSUE'));
			nextQueueElement();
		} catch (error) {
			editStatus(key, RESULT_STATUS.UPLOAD_ERROR);
			showError(t('ERROR_NEW_ISSUE'));
			nextQueueElement();
		}
	}

	/**
	 * comment on an existing gitlab issue
	 */
	async function commentGitlabIssue(
		accessToken,
		repositoryLocation,
		projectID,
		issueID,
		key,
		comment,
	) {
		try {
			axios.defaults.headers.common['PRIVATE-TOKEN'] = accessToken;
			let fullUrl =
				repositoryLocation.replace(/\/$/, '') +
				GITLAB_API +
				projectID +
				GITLAB_ISSUES +
				'/' +
				issueID +
				GITLAB_COMMENTS;
			if (comment && comment.text) {
				const body = setLineBreaks(encodeURIComponent(comment.text));
				fullUrl = fullUrl + '?body=' + body;
			} else {
				showError(t('ERROR_INSUFFICIENT_INFO'));
			}
			const resp = await axios.post(fullUrl);
			editStatus(
				key,
				resp.status === 201
					? RESULT_STATUS.UPLOADED
					: RESULT_STATUS.UPLOAD_ERROR,
			);
			showSuccess(t('SUCCESS_COMMENT_ISSUE'));
			nextQueueElement();
		} catch (error) {
			editStatus(key, RESULT_STATUS.UPLOAD_ERROR);
			showError(t('ERROR_COMMENTING'));
			nextQueueElement();
		}
	}

	/**
	 * upload an image to gitlab and then link it in either issue or comment text
	 */
	async function uploadGitLabImage(
		accessToken,
		repositoryLocation,
		projectID,
		source,
		next,
	) {
		try {
			const fullUrl =
				repositoryLocation + GITLAB_API + projectID + GITLAB_UPLOADS;
			const data = new FormData();
			data.append('file', {
				uri: source,
				type: 'image/jpg',
				name: 'image.jpg',
			});
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					'PRIVATE-TOKEN': accessToken,
				},
			};
			const resp = await axios.post(fullUrl, data, config);
			if (resp.status === 201) {
				return resp.data.markdown;
			} else {
				nextQueueElement();
				showError(t('ERROR_UPLOADING_IMAGE'));
			}
		} catch (error) {
			nextQueueElement();
			showError(t('ERROR_UPLOADING_IMAGE'));
		}
	}

	return {startSharing, sharingLoading};
};
