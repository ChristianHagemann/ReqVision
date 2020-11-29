import {useSelector} from 'react-redux';
import {get, values} from 'lodash';

import {useSelectedImage} from '../../image/hooks/useSelectedImage';

/**
 * get all image segments from a given image
 */
export const useImageSegments = (imageKey) => {
	const {selectedImage} = useSelectedImage();
	const imageSegments = get(
		useSelector((state) => state.recognize.images),
		imageKey ? imageKey : selectedImage ? selectedImage.key : 0,
	);

	return {segments: values(imageSegments)};
};
