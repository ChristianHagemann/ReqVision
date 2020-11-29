import React, {useState} from 'react';
import {
	Dimensions,
	FlatList,
	PermissionsAndroid,
	StyleSheet,
	View,
	Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {faCamera, faFlask, faFolder} from '@fortawesome/free-solid-svg-icons';

import Button from './basics/button';
import ImageTile from './image-tile';
import Text from './basics/text';
import {useSelectedImage} from '../store/image/hooks/useSelectedImage';
import {useOwnNavigation} from '../store/navigation/hooks/useOwnNavigation';
import {useHandleRecognitionQueue} from '../store/recognize/hooks/useHandleRecognitionQueue';
import {useRecognizeQueue} from '../store/recognize/hooks/useRecognizeQueue';
import {useRecognitionApi} from '../store/recognize/hooks/useRecognitionApi';
import {useTheme} from '../store/settings/hooks/useTheme';
import {useActiveEvent} from '../store/events/hooks/useActiveEvent';
import {useImageFunctions} from '../store/image/hooks/useImageFunctions';
import {useNotification} from '../utils/hooks/useNotification';
import {ROUTES} from '../utils/consts';
import style from '../utils/styles';

/**
 *
 */
export default function ImageList(props) {
	const {t} = useTranslation();

	const {navigate} = useOwnNavigation();
	const [theme] = useTheme();
	const {activeEventKey} = useActiveEvent();
	const {setSelectedImage} = useSelectedImage();
	const {saveImage} = useImageFunctions();
	const {addToRecQueue, removeFromRecQueue} = useHandleRecognitionQueue();
	const {recognizeQueue} = useRecognizeQueue();
	const {startQueue} = useRecognitionApi();
	const {showError} = useNotification();

	const [inSelectedMode, setSelectionMode] = useState(
		recognizeQueue && recognizeQueue.length > 1,
	);

	const {images} = props;
	const hideButton = !recognizeQueue || recognizeQueue.length <= 0;
	
	/**
	 * go to camera view to take a picture for the event
	 */
	async function goToCamera() {
		navigate(ROUTES.CAMERA);
	}

	/**
	 * open camera roll to choose an image to add to event
	 */
	async function openCameraRoll() {
		if (activeEventKey) {
			try {
				let granted;
				if (Platform.OS === 'android') {
					granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
						{
							title: t('STORAGE_PERMISSION_TITLE'),
							message: t('STORAGE_PERMISSION_MESSAGE'),
							buttonPositive: t('ACCEPT'),
							buttonNegative: t('DECLINE'),
						},
					);
				}
				if (
					Platform.OS === 'ios' ||
					granted === PermissionsAndroid.RESULTS.GRANTED
				) {
					ImagePicker.openPicker({
						width: 1000,
						height: 1000,
						cropping: false,
						smartAlbums: [
							'PhotoStream',
							'Favorites',
							'RecentlyAdded',
							'UserLibrary',
							'SelfPortraits',
							'Screenshots',
						],
					}).then(
						(image) => {
							saveImage(image, image.path);
						},
						(reason) => {
							console.log(reason);
						},
					);
				}
			} catch (err) {
				console.warn(err);
			}
		} else {
			showError(t('ERROR_NO_EVENT_SELECTED'));
		}
	}

	/**
	 * add the image (or image segments) to the recognize queue
	 * or select to edit single image if inSelectionMode
	 * @param image
	 * @param selected
	 */
	function onTilePressed(image, selected) {
		if (inSelectedMode) {
			if (!selected) {
				addToRecQueue(image.key);
			} else {
				removeFromRecQueue(image.key);
				if (recognizeQueue.length === 1) {
					setSelectionMode(false);
				}
			}
		} else {
			setSelectedImage(image);
			navigate(ROUTES.EDIT);
		}
	}

	/**
	 * toggles between selecting for analysis and going to edit on press
	 * @param image
	 */
	function onTileLongPress(image) {
		setSelectionMode(true);
		addToRecQueue(image.key);
	}

	/**
	 * start the text recognition process by resizing first
	 * pass result path to checkPreProcessing
	 */
	function startRecQueue() {
		startQueue();
		navigate(ROUTES.RESULTS);
	}

	const height = Dimensions.get('window').height;

	return (
		<View
			style={[
				styles.listView,
				{backgroundColor: theme.backgroundColor, height: height},
			]}>
			{!images ||
				(images.length === 0 && (
					<View style={style.noResult}>
						<Text style={style.smallMarginBottom} size={20}>
							{t('PLACEHOLDER_NO_IMAGE_IN_EVENT')}
						</Text>
					</View>
				))}
			<View style={styles.button}>
				<Button
					icon={faFolder}
					text={t('LOAD_FROM_STORAGE')}
					onPress={openCameraRoll}
					width={160}
				/>
				<Button
					icon={faCamera}
					text={t('GO_TO_CAMERA')}
					onPress={goToCamera}
					width={160}
				/>
			</View>
			{images && (
				<FlatList
					data={images}
					numColumns={3}
					initialNumToRender={15}
					columnWrapperStyle={styles.imageList}
					renderItem={({item, index}) => (
						<ImageTile
							key={index}
							image={item}
							onTilePressed={onTilePressed}
							onTileLongPressed={onTileLongPress}
						/>
					)}
				/>
			)}
			{!hideButton && (
				<View
					style={[
						styles.analyseContainer,
						{backgroundColor: theme.backgroundColor},
					]}>
					<Button
						icon={faFlask}
						text={t('ANALYZE_SELECTION')}
						onPress={startRecQueue}
						width="100%"
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	imageList: {},
	listView: {
		paddingBottom: 70,
		minHeight: '94%',
		width: '100%',
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	analyseContainer: {
		padding: 15,
		position: 'absolute',
		width: '100%',
		bottom: 65,
		height: 60,
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
	},
});
