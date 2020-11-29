import {useDispatch} from 'react-redux';
import {
	setSharingOperation,
	setSharingPlatform,
	setSharingMail,
} from '../sharingActions';

/**
 * hook to handle options for the sharing reducer
 * setting platform, operation and/or email address
 */
export const useHandleSharingOptions = () => {
	const dispatch = useDispatch();

	function setPlatform(platform) {
		dispatch(setSharingPlatform(platform));
	}

	function setOperation(operation) {
		dispatch(setSharingOperation(operation));
	}

	function setMail(mail) {
		dispatch(setSharingMail(mail));
	}

	return {setPlatform, setOperation, setMail};
};
