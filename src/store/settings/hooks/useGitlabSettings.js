import {useSelector, useDispatch} from 'react-redux';
import {get} from 'lodash';

import {
	setGitlabToken,
	setGitlabLocation,
	setGitlabProjectId,
} from '../settingsActions';

/**
 * hook to handle gitlab options
 * getting and settings token, location and project ID per event
 */
export const useGitlabSettings = (key) => {
	const dispatch = useDispatch();
	const activeKey = useSelector((state) => state.event.active);
	const settings = get(
		useSelector((state) => state.settings.events),
		key ? key : activeKey,
	);

	const token = settings && settings.gitlab ? settings.gitlab.token : '';
	const location = settings && settings.gitlab ? settings.gitlab.location : '';
	const projectID =
		settings && settings.gitlab ? settings.gitlab.projectID : '';

	function setToken(glToken) {
		dispatch(setGitlabToken(key ? key : activeKey, glToken));
	}

	function setLocation(glLocation) {
		dispatch(setGitlabLocation(key ? key : activeKey, glLocation));
	}

	function setProjectID(glProjectID) {
		dispatch(setGitlabProjectId(key ? key : activeKey, glProjectID));
	}

	return {
		glToken: token,
		glLocation: location,
		glProjectID: projectID,
		setGitlabToken: setToken,
		setGitlabLocation: setLocation,
		setGitlabProjectID: setProjectID,
	};
};
