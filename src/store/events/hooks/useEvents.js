import {useSelector} from 'react-redux';
import {sortBy, values} from 'lodash';
import moment from 'moment';

import {useActiveEvent} from './useActiveEvent';

/**
 * get all events and return them sorted by isActive, creationDate(backwards) and name
 */
export const useEvents = () => {
	const {activeEventKey} = useActiveEvent();

	let sorted = values(useSelector((state) => state.event.events));
	sorted = sortBy(sorted, [
		function(p) {
			return p.key === activeEventKey;
		},
		function(p) {
			return moment.unix(new Date(p.date));
		},
		'name',
	]);

	return {events: sorted};
};
