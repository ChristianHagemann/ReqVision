import {useSelector} from 'react-redux';
import {forEach, get, keys, values} from 'lodash';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';
import {useEventImages} from '../../image/hooks/useEventImages';

/**
 *
 */
export const useFindImageFromKey = () => {
	const {activeEventKey} = useActiveEvent();
	const imagesSegments = values(useSelector((state) => state.recognize.images));
	const {eventImages} = useEventImages(activeEventKey);

	/**
	 *
	 */
	function findImage(key) {
		let image = null;

		forEach(imagesSegments, (segments) => {
			const segmentKeys = keys(segments);
			forEach(segmentKeys, (segment) => {
				if (segment === key) {
					image = get(segments, segment);
				}
			});
		});

		if (image === null) {
			forEach(eventImages, (original) => {
				if (original.key === key) {
					image = original;
				}
			});
		}

		return image;
	}

	return {findImage};
};
