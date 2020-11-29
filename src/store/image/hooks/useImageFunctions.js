import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {mkdir, moveFile, unlink} from 'react-native-fs';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';
import {useCreateKey} from '../../../utils/hooks/useCreateKey';
import {useNotification} from '../../../utils/hooks/useNotification';
import {addImageToEvent, deleteImage} from '../imageActions';
import {useOwnNavigation} from '../../navigation/hooks/useOwnNavigation';
import {useImageSegments} from '../../recognize/hooks/useImageSegments';
import {useRemoveImageSegment} from '../../recognize/hooks/useRemoveImageSegment';
import {DIRECTORY_PATH, ROUTES} from '../../../utils/consts';

let RNFS = require('react-native-fs');

/**
 * hook that saves the provided image to the phones hard drive
 */
export const useImageFunctions = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const {createKey} = useCreateKey();
	const {segments} = useImageSegments();
	const {removeSegment} = useRemoveImageSegment();
	const {activeEventKey, activeEventName, activeEventDate} = useActiveEvent();
	const {showSuccess} = useNotification();

	const {navigate} = useOwnNavigation();

	const path =
		(Platform.OS === 'ios'
			? RNFS.DocumentDirectoryPath
			: 'file://' + RNFS.ExternalStorageDirectoryPath) + DIRECTORY_PATH;

	/**
	 *
	 * @param image
	 * @param origin
	 */
	function saveImage(image, origin) {
		const key = createKey();
		const directory = path + activeEventDate + '-' + activeEventName + '/';
		mkdir(directory).then(() => {
			const imagePath = directory + key + '.jpg';
			moveFile(origin, imagePath).then(() => {
				dispatch(
					addImageToEvent(activeEventKey, {
						key: key,
						source: imagePath,
						width: image.width,
						height: image.height,
					}),
				);
				showSuccess(t('SUCCESS_IMAGE_ADDED') + ' ' + activeEventName);
			});
		});
	}

	/**
	 * remove the image and all associated segments
	 * from the store as well as from phone storage
	 * @param image the image to remove
	 */
	function removeImage(image) {
		unlink(image.source).then(() => {
			dispatch(deleteImage(activeEventKey, image.key));
			for (let i = 0; i < segments.length; i++) {
				removeSegment(segments[i], image.key);
			}
			navigate(ROUTES.EVENTS);
			showSuccess(t('SUCCESS_IMAGE_DELETED') + ' ' + activeEventName);
		});
	}

	return {saveImage, removeImage};
};
