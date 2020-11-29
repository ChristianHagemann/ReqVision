import {useSelector} from 'react-redux';
import {get, values} from 'lodash';

/**
 * get all images for given key
 * if non is provided use key from active event as default
 */
export const useEventImages = (key) => {
	const activeKey = useSelector((state) => state.event.active);
	const images = get(
		useSelector((state) => state.image.events),
		key ? key : activeKey,
	);

	return {eventImages: values(images) || null};
};
