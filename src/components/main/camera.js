import React, {Fragment, useEffect, useState} from 'react';
import {
	Dimensions,
	Platform,
	StyleSheet,
	View,
	PermissionsAndroid,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {useIsFocused} from 'react-navigation-hooks';
import {faArrowLeft, faBolt, faCamera} from '@fortawesome/free-solid-svg-icons';

import Button from '../basics/button';
import {useTheme} from '../../store/settings/hooks/useTheme';
import {useImageFunctions} from '../../store/image/hooks/useImageFunctions';
import {useActiveEvent} from '../../store/events/hooks/useActiveEvent';
import {useNotification} from '../../utils/hooks/useNotification';
import {useOwnNavigation} from '../../store/navigation/hooks/useOwnNavigation';
import {ROUTES} from '../../utils/consts';


/**
 * camera component to take pictures and toggle flash
 * main component in camera view
 */
export const Camera = ({initialProps}) => {
	const [
		{cameraRef, type, ratio, autoFocus, flash, autoFocusPoint},
		{setFlash, takePicture},
	] = useCamera(initialProps);
	const isFocused = useIsFocused();
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {navigate} = useOwnNavigation();

	const {activeEventKey} = useActiveEvent();
	const {saveImage} = useImageFunctions();
	const {showError, showInfo} = useNotification();
	const [storagePermission, setStoragePermission] = useState(true);
	const width = Dimensions.get('window').width;

	useEffect(() => {
		if (Platform.OS === 'android') {
			PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			).then((granted) => {
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					setStoragePermission(true);
				}
			});
		}
	}, [setStoragePermission, t]);

	/**
	 * either save image or show error if no event selected
	 */
	async function onTakePicturePressed() {
		showInfo(t('INFO_IMAGE_TAKEN'));
		setTimeout(async function() {
			if (activeEventKey) {
				const image = await takePicture({base64: true});
				saveImage(image, image.uri);
			} else {
				showError(t('ERROR_NO_EVENT_SELECTED'));
			}
		}, 300);
	}

	return (
		<View
			style={[styles.container, {marginTop: Platform.OS === 'ios' ? 0 : 120}]}>
			{isFocused && storagePermission && (
				<RNCamera
					ref={cameraRef}
					autoFocusPointOfInterest={autoFocusPoint.normalized}
					captureAudio={false}
					type={type}
					ratio={ratio}
					style={styles.cameraPreview}
					flashMode={flash}
					autoFocus={autoFocus}
					androidCameraPermissionOptions={{
						title: t('CAMERA_PERMISSION_TITLE'),
						message: t('CAMERA_PERMISSION_MESSAGE'),
						buttonPositive: t('ACCEPT'),
						buttonNegative: t('DECLINE'),
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission to use audio recording',
						message: 'We need your permission to use your audio',
						buttonPositive: t('ACCEPT'),
						buttonNegative: t('DECLINE'),
					}}
				/>
			)}
			{isFocused && (
				<Fragment>
					<View
						style={[
							styles.buttonRow,
							{backgroundColor: theme.primaryColor, width: width},
						]}>
						<Button
							icon={faArrowLeft}
							onPress={() => {
								navigate(ROUTES.EVENTS);
							}}
							width={100}
						/>
						<Button
							icon={faCamera}
							onPress={onTakePicturePressed}
							width={100}
						/>
						<Button
							icon={faBolt}
							onPress={() => {
								flash === 'on' ? setFlash('off') : setFlash('on');
							}}
							color={flash === 'off' ? 'grey' : 'black'}
							width={100}
						/>
					</View>
				</Fragment>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
	cameraPreview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	buttonRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 8,
	},
});
