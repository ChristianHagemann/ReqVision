import {indexOf} from 'lodash';

import {useEventImages} from './useEventImages';
import {useSelectedImage} from './useSelectedImage';

/**
 * hook that sets the new selected image for editing when users swipes
 */
export const useImageSwipes = () => {

	const {eventImages} = useEventImages();
	const {selectedImage, setSelectedImage} = useSelectedImage();

	/**
	 * set previous image (in array) as active one for editing
	 */
	function backwardSwipe() {
		const selectedIdx = indexOf(eventImages, selectedImage);
		let newIdx = selectedIdx - 1;
		if (newIdx < 0) {
			newIdx = eventImages.length - 1;
		}
		setSelectedImage(eventImages[newIdx]);
	}

	/**
	 * set next image (in array) as active one for editing
	 */
	function forwardSwipe() {
		const selectedIdx = indexOf(eventImages, selectedImage);
		let newIdx = selectedIdx + 1;
		if (newIdx === eventImages.length) {
			newIdx = 0;
		}
		setSelectedImage(eventImages[newIdx]);
	}

	return {backwardSwipe, forwardSwipe};
};
