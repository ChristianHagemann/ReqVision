import {useDispatch, useSelector} from 'react-redux';
import {indexOf} from 'lodash';

import {addToSharingQueue, removeFromSharingQueue} from '../sharingActions';

/**
 * hook to handle the current sharing queue by adding or deleting elements
 */
export const useSharingQueue = () => {
	const dispatch = useDispatch();
	const sharingQueue = useSelector((state) => state.sharing.sharingQueue);

	function addToQueue(key) {
		dispatch(addToSharingQueue(key));
	}

	function removeFromQueue(key) {
		dispatch(removeFromSharingQueue(key));
	}

	function isSelected(key) {
		return indexOf(sharingQueue, key) !== -1;
	}

	return {sharingQueue, addToQueue, removeFromQueue, isSelected};
};
