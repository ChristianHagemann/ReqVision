import {useSelector, useDispatch} from 'react-redux';
import {setImage} from '../imageActions';

/**
 * hook to get and set the currently selected image for editing
 */
export const useSelectedImage = () => {
	const dispatch = useDispatch();

	const selectedImage = useSelector((state) => state.image.image);

	function setSelectedImage(image) {
		dispatch(setImage(image));
	}

	return {selectedImage, setSelectedImage};
};
