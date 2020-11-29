import {useDispatch, useSelector} from 'react-redux';
import {unlink} from 'react-native-fs';

import {useNotification} from '../../../utils/hooks/useNotification';
import {removeImageSegment} from '../recognizeActions';
import {useTranslation} from 'react-i18next';

/**
 * remove an image segment from a given image
 */
export const useRemoveImageSegment = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation();
	const {showSuccess} = useNotification();
	const openImageKey = useSelector((state) =>
		state.image.image ? state.image.image.key : null,
	);

	/**
	 *
	 * @param segment
	 * @param imageKey
	 */
	function removeSegment(segment, imageKey) {
		unlink(segment.source).then(() => {
			showSuccess(t('SUCCESS_SEGMENT_DELETED'));
			dispatch(
				removeImageSegment(imageKey ? imageKey : openImageKey, segment.key),
			);
		});
	}

	return {removeSegment};
};
