import {useSelector, useDispatch} from 'react-redux';
import { setMicrosoftEndpoint, setMicrosoftKey } from '../settingsActions';

/**
 * hook for microsoft API settings
 * returns key and endpoint as well as functions to set them
 */
export const useMicrosoftSettings = () => {
	const dispatch = useDispatch();

	const global = useSelector((state) => state.settings.global);
	const microsoftEndpoint = global ? global.microsoftEndpoint : '';
	const microsoftKey = global ? global.microsoftKey : '';

	function setEndPoint(endpoint) {
		dispatch(setMicrosoftEndpoint(endpoint));
	}

	function setKey(key) {
		dispatch(setMicrosoftKey(key));
	}

	return {
		microsoftEndpoint,
		microsoftKey,
		setMicrosoftEndpoint: setEndPoint,
		setMicrosoftKey: setKey,
	};
};
