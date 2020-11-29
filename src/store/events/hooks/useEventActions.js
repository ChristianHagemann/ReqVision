import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {setActiveEvent, deleteEvent, addNewEvent} from '../eventActions';

/**
 * hook to handle event actions
 * current activating, adding new and deleting
 */
export const useEventActions = () => {
	const dispatch = useDispatch();

	function setActive(key) {
		dispatch(setActiveEvent(key));
	}

	function addNew(key, name) {
		dispatch(
			addNewEvent(key, {
				key,
				name,
				date: new Date(),
			}),
		);
	}

	function deletEvent(key) {
		dispatch(deleteEvent(key));
	}

	return {
		setActiveEvent: setActive,
		addNewEvent: addNew,
		deleteEvent: deletEvent,
	};
};
