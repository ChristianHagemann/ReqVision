import {useDispatch, useSelector} from 'react-redux';
import {forEach, get, indexOf, isEmpty} from 'lodash';

import {useRecognizeQueue} from './useRecognizeQueue';
import {addImageToRecQueue, removeFromRecQueue} from '../recognizeActions';
import {useActiveEvent} from '../../events/hooks/useActiveEvent';

/**
 * hook that supplies add and remove from recognition queue functions
 */
export const useHandleRecognitionQueue = () => {
	const dispatch = useDispatch();

	const images = useSelector((state) => state.recognize.images);
	const {activeEventKey} = useActiveEvent();
	const {recognizeQueue} = useRecognizeQueue();

	function addToRecQueue(key) {
		if (!isEmpty(get(images, key))) {
			// segments exist for this image; add all segments
			const segments = get(images, key);
			forEach(segments, (segment) => {
				dispatch(addImageToRecQueue(activeEventKey, segment.key));
			});
		} else {
			// no segment exists; add original image
			dispatch(addImageToRecQueue(activeEventKey, key));
		}
	}

	function removeFromQueue(key) {
		if (indexOf(recognizeQueue, key) === -1) {
			// original is not in queue (but segments), remove all of them
			const segments = get(images, key);
			forEach(segments, (segment) => {
				dispatch(removeFromRecQueue(activeEventKey, segment.key));
			});
		} else {
			// original image is in recognition queue; remove it
			dispatch(removeFromRecQueue(activeEventKey, key));
		}
	}

	return {addToRecQueue, removeFromRecQueue: removeFromQueue};
};
