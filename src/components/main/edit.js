import React, {useState} from 'react';
import {
	Dimensions,
	ImageBackground,
	Modal,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
	faArrowLeft,
	faCrop,
	faTrash,
} from '@fortawesome/free-solid-svg-icons/index';

import Button from '../basics/button';
import Text from '../basics/text';
import ImageRectangle from '../image-rectangle';
import TaggingModal from '../tagging-modal';
import {useImageFunctions} from '../../store/image/hooks/useImageFunctions';
import {useImageSwipes} from '../../store/image/hooks/useImageSwipes';
import {useSelectedImage} from '../../store/image/hooks/useSelectedImage';
import {useOwnNavigation} from '../../store/navigation/hooks/useOwnNavigation';
import {useImageSegments} from '../../store/recognize/hooks/useImageSegments';
import {useTheme} from '../../store/settings/hooks/useTheme';
import {ROUTES} from '../../utils/consts';
import style from '../../utils/styles';


/**
 * component to crop and tag images
 * main component in the edit view
 */
export default function Edit() {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const [theme] = useTheme();
	const {navigate} = useOwnNavigation();

	const {selectedImage, setSelectedImage} = useSelectedImage();
	const {segments} = useImageSegments();
	const {removeImage} = useImageFunctions();
	const {backwardSwipe, forwardSwipe} = useImageSwipes();

	const [cropping, toggleCropping] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentCropped, setCurrentCropped] = useState(null);

	const width = Dimensions.get('window').width;

	/**
	 * discard the image by setting path and info in reducer back to default values
	 */
	function goBack() {
		setSelectedImage(null);
		navigate(ROUTES.EVENTS);
	}

	/**
	 * delete the current image and all its image segments
	 */
	function deleteImage() {
		removeImage(selectedImage);
	}

	/**
	 * close modal and remove current cropping image
	 */
	function onTaggingClosePressed() {
		setModalOpen(false);
		setCurrentCropped(null);
	}

	/**
	 * open image cropper to select image segments
	 */
	function openCropper() {
		if (!cropping) {
			ImagePicker.openCropper({
				path: selectedImage.source,
				width: selectedImage.width,
				height: selectedImage.height,
				freeStyleCropEnabled: true,
				cropperToolbarTitle: t('SELECT_IMAGE_SEGMENT'),
				cropperToolbarColor: theme.primaryColor,
				cropperActiveWidgetColor: 'black',
				cropperStatusBarColor: theme.primaryColor,
				hideBottomControls: false,
				writeTempFile: true,
				cropperChooseText: 'Crop',
			}).then(
				(image) => {
					setCurrentCropped(image);
					setModalOpen(true);
					toggleCropping(false);
				},
				(reason) => {
					console.log(reason);
				},
			);
		}
		toggleCropping(false);
	}

	return (
		<View style={selectedImage === null ? '' : styles.container}>
			{selectedImage === null && (
				<View style={selectedImage === null ? style.noResult : ''}>
					<Text style={style.smallMarginBottom} size={20}>
						{t('PLACEHOLDER_NO_IMAGE_SELECTED')}
					</Text>
				</View>
			)}
			{selectedImage && selectedImage.source && (
				<View>
					<Modal animationType="slide" transparent={true} visible={modalOpen}>
						<TaggingModal
							image={currentCropped}
							onClosePressed={onTaggingClosePressed}
						/>
					</Modal>
					{selectedImage !== null &&
						selectedImage.source !== '' &&
						selectedImage.width > 0 &&
						selectedImage.height > 0 && (
							<GestureRecognizer
								style={{flex: 1}}
								onSwipeLeft={() => forwardSwipe()}
								onSwipeRight={() => backwardSwipe()}>
								<ImageBackground
									resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
									source={{uri: selectedImage.source}}
									style={styles.preview}>
									{selectedImage !== null &&
										selectedImage.source !== '' &&
										selectedImage.width > 0 &&
										selectedImage.height > 0 &&
										segments !== null &&
										segments.length > 0 &&
										segments.map(function(segment, index) {
											if (segment.rectangle) {
												return (
													<ImageRectangle
														key={index}
														index={segment.key}
														segment={segment}
														type={segment.type}
														original={selectedImage}
													/>
												);
											}
										})}
								</ImageBackground>
							</GestureRecognizer>
						)}
					<View style={[style.buttonRow, {width: width}]}>
						<Button icon={faArrowLeft} onPress={() => goBack()} width={100} />
						<Button
							icon={faCrop}
							text={t('CROP')}
							onPress={() => openCropper()}
							width={100}
						/>
						<Button
							icon={faTrash}
							color={theme.red}
							onPress={deleteImage}
							width={100}
						/>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxHeight: 'auto',
		maxWidth: '100%',
	},
});
