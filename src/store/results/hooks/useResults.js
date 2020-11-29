import {useSelector} from 'react-redux';
import {get, values} from 'lodash';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';

/**
 * hook to get all results from currently active event
 */
export const useResults = () => {
	const {activeEventKey} = useActiveEvent();
	const object = useSelector((state) => state.result.events);
	const results = values(get(object, activeEventKey)).sort((a, b) =>
		a.key > b.key ? 1 : -1,
	);

	return {results};
};
