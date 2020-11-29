import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import {setIssues, clearIssues} from '../sharingActions';
import {useGitlabSettings} from '../../settings/hooks/useGitlabSettings';
import {useSharingOptions} from './useSharingOptions';
import {useAsanaSettings} from '../../settings/hooks/useAsanaSettings';
import {useNotification} from '../../../utils/hooks/useNotification';
import {
	ASANA_API,
	ASANA_PROJECTS,
	ASANA_TASKS,
	GITLAB_API,
	GITLAB_ISSUES,
	SHARING_STRINGS,
} from '../../../utils/consts';


/**
 * hook that fetches issues from the corresponding gitlab or asana project
 * returning issues, function to clear issues and loading status
 */
export const useIssues = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const {platform, operation} = useSharingOptions();
	const {asToken, asProjectID} = useAsanaSettings();
	const {glToken, glLocation, glProjectID} = useGitlabSettings();

	const {showError} = useNotification();
	const issues = useSelector((state) => state.sharing.issues);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const query = async () => {
			setLoading(true);
			if (platform && platform.value === SHARING_STRINGS.GITLAB) {
				axios.defaults.headers.common['PRIVATE-TOKEN'] = glToken;
				const fullUrl =
					glLocation +
					GITLAB_API +
					glProjectID +
					GITLAB_ISSUES +
					'?state=opened';
				try {
					const resp = await axios.get(fullUrl);
					const array = resp.data;
					let iss = [];
					for (let i = 0; i < array.length; i++) {
						iss.push({label: array[i].title, value: array[i].iid});
					}
					dispatch(setIssues(iss));
				} catch (err) {
					console.warn(err);
					showError(t('ERROR_FETCHING_ISSUES'));
				} finally {
					setLoading(false);
				}
			} else if (platform && platform.value === SHARING_STRINGS.ASANA) {
				axios.defaults.headers.common.Authorization = 'Bearer ' + asToken;
				axios.defaults.headers.common.Accept = 'application/json';
				const fullURL =
					ASANA_API +
					ASANA_PROJECTS +
					'/' +
					asProjectID +
					ASANA_TASKS +
					'?opt_fields=name,notes';
				try {
					const resp = await axios.get(fullURL);
					const tasks = resp.data.data;
					let iss = [];
					for (let i = 0; i < tasks.length; i++) {
						iss.push({label: tasks[i].name, value: tasks[i].gid});
					}
					dispatch(setIssues(iss));
				} catch (err) {
					console.warn(err);
					showError(t('ERROR_FETCHING_TASKS'));
				} finally {
					setLoading(false);
				}
			}
		};
		if (
			operation &&
			operation.value === SHARING_STRINGS.COMMENT &&
			issues.length === 0
		) {
			query().then(() => {
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, [
		t,
		dispatch,
		showError,
		platform,
		operation,
		glToken,
		glLocation,
		glProjectID,
		asToken,
		asProjectID,
		issues,
	]);

	function purgeIssues() {
		dispatch(clearIssues());
	}

	return {issues, clearIssues: purgeIssues, loading};
};
