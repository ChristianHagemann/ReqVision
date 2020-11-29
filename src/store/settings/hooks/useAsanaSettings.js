import {useSelector, useDispatch} from 'react-redux';
import {get} from 'lodash';

import {setAsanaToken, setAsanaProjectId} from '../settingsActions';

/**
 * hook to handle asana options
 * getting and setting token and project ID per event
 */
export const useAsanaSettings = (key) => {
	const dispatch = useDispatch();
	const activeKey = useSelector((state) => state.event.active);
	const settings = get(
		useSelector((state) => state.settings.events),
		key ? key : activeKey,
	);

	const token = settings && settings.asana ? settings.asana.token : '';
	const projectID = settings && settings.asana ? settings.asana.projectID : '';

	function setToken(asToken) {
		dispatch(setAsanaToken(key ? key : activeKey, asToken));
	}

	function setProjectID(asProjectID) {
		dispatch(setAsanaProjectId(key ? key : activeKey, asProjectID));
	}

	return {
		asToken: token,
		asProjectID: projectID,
		setAsanaToken: setToken,
		setAsanaProjectID: setProjectID,
	};
};
