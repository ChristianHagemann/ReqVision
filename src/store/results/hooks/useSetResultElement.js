import {useDispatch} from 'react-redux';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';
import {setResultElement} from '../resultActions';

/**
 * hook to return function for setting a result element
 */
export const useSetResultElement = () => {
	const dispatch = useDispatch();
	const {activeEventKey} = useActiveEvent();

	return (key, result) => {
		dispatch(setResultElement(activeEventKey, key, result));
	};
};
