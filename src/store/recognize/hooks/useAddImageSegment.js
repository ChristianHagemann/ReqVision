import {useDispatch, useSelector} from 'react-redux';

import {addNewImageSegment} from '../recognizeActions';

/**
 * hook returning function to add new segment to image
 */
export const useAddImageSegment = () => {
	const dispatch = useDispatch();
	const imageKey = useSelector((state) => state.image.image.key);

	function addImageSegment(segment) {
		dispatch(addNewImageSegment(imageKey, segment));
	}

	return {addImageSegment};
};
