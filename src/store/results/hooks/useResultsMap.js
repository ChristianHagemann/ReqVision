import {useSelector} from 'react-redux';
import {get} from 'lodash';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';

/**
 * hook to return the full map of results for one event
 */
export const useResultsMap = () => {
	const {activeEventKey} = useActiveEvent();
	const object = useSelector((state) => state.result.events);
	const results = get(object, activeEventKey);

	return {results};
};
