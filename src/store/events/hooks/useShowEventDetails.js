import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';

import {setDetailsView} from '../eventActions';

/**
 * hook for the toggle of event overview and event details
 */
export const useShowEventDetails = () => {
	const dispatch = useDispatch();

	function setShowEventDetails(bool) {
		dispatch(setDetailsView(bool));
	}

	return {
		showDetails: useSelector((state) => state.event.details),
		setShowEventDetails,
	};
};
