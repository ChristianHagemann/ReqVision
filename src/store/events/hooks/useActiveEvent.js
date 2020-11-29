import {useSelector} from 'react-redux';
import {get} from 'lodash';
import moment from 'moment';

/**
 * hook to return currently active event key, name and creation date
 */
export const useActiveEvent = () => {
	const activeEventKey = useSelector((state) => state.event.active);
	const activeEvent = get(
		useSelector((state) => state.event.events),
		activeEventKey ? activeEventKey : 0,
	);

	return {
		activeEventKey,
		activeEventName: activeEvent ? activeEvent.name : '',
		activeEventDate: activeEvent
			? moment(activeEvent.date).format('YY-MMM-DD')
			: null,
	};
};
