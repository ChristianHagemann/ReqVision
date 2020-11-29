import {useDispatch} from 'react-redux';

import {editResultStatus, editResultText} from '../resultActions';
import {useActiveEvent} from '../../events/hooks/useActiveEvent';

/**
 * hook that returns functions to edit result element's status and text
 */
export const useEditResultElement = () => {
	const dispatch = useDispatch();
	const {activeEventKey} = useActiveEvent();

	function editText(key, text) {
		dispatch(editResultText(activeEventKey, key, text));
	}

	function editStatus(key, status) {
		dispatch(editResultStatus(activeEventKey, key, status));
	}

	return {editText, editStatus};
};
