import {useSelector} from 'react-redux';
import {forEach, get, indexOf, values} from 'lodash';

import {useRecognizeQueue} from './useRecognizeQueue';

/**
 * hook that returns a function to check if an image is currenty selected for recognition
 * true if image is in that queue
 */
export const useImageSelectedForRecognition = () => {
	const {recognizeQueue} = useRecognizeQueue();
	const images = useSelector((state) => state.recognize.images);

	function isSelected(key) {
		const marked = indexOf(recognizeQueue, key);
		const segmentObject = get(images, key, null);

		let segmentsMarked = false;
		if (segmentObject) {
			const segments = values(segmentObject);
			forEach(segments, (segment) => {
				if (indexOf(recognizeQueue, segment.key) !== -1) {
					segmentsMarked = true;
				}
			});
		}

		return marked !== -1 || segmentsMarked;
	}

	return {isSelected};
};
