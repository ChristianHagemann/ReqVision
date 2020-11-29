import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {moveFile} from 'react-native-fs';

import Button from './basics/button';
import Checkbox from './basics/checkbox';
import Text from './basics/text';
import TextInput from './basics/textinput';
import {useActiveEvent} from '../store/events/hooks/useActiveEvent';
import {useAddImageSegment} from '../store/recognize/hooks/useAddImageSegment';
import {useTheme} from '../store/settings/hooks/useTheme';
import {useCreateKey} from '../utils/hooks/useCreateKey';
import {DIRECTORY_PATH, TYPES} from '../utils/consts';
import style from '../utils/styles';


let RNFS = require('react-native-fs');

/**
 * modal for tagging the selected area
 */
export default function TaggingModal(props) {
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {activeEventName, activeEventDate} = useActiveEvent();
	const {addImageSegment} = useAddImageSegment();
	const {createKey} = useCreateKey();

	const [isText, setIsText] = useState(true);
	const [title, setTitle] = useState('');

	const path =
		(Platform.OS === 'ios'
			? RNFS.DocumentDirectoryPath
			: 'file://' + RNFS.ExternalStorageDirectoryPath) + DIRECTORY_PATH;

	/**
	 * save cropped segment permanently to custom directory
	 * (has to exist but does because original image is from there)
	 */
	function onSubmitPressed() {
		const segmentKey = createKey();
		const directory = path + activeEventDate + '-' + activeEventName + '/';
		const imagePath = directory + segmentKey + '.jpg';
		moveFile(props.image.path, imagePath).then(() => {
			addImageSegment({
				key: segmentKey,
				type: isText ? TYPES.TEXT : TYPES.IMAGE,
				mode: props.image.mode,
				source: imagePath,
				width: props.image.cropRect.width,
				height: props.image.cropRect.height,
				rectangle: {
					x: props.image.cropRect.x,
					y: props.image.cropRect.y,
					width: props.image.cropRect.width,
					height: props.image.cropRect.height,
				},
			});
			props.onClosePressed();
		});
	}

	return (
		<View
			style={[
				style.modalStyle,
				{backgroundColor: theme.primaryColor, borderColor: theme.frameColor},
			]}>
			<View style={styles.header}>
				<View style={styles.textContainer}>
					<Text size={20} style={styles.text}>
						{t('CHOOSE_RECOGNITION')}
					</Text>
				</View>
				<TouchableOpacity onPress={props.onClosePressed} style={styles.close}>
					<FontAwesomeIcon
						icon={faTimes}
						size={16}
						style={{color: theme.secondaryColor}}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.textInput}>
				<TextInput
					autoCapitalize="none"
					autoComplete="off"
					label={t('OPTIONAL_TITLE')}
					placeholder={t('PLACEHOLDER_OPTIONAL')}
					value={title}
					onChangeText={(t) => setTitle(t)}
				/>
			</View>
			<View style={styles.body}>
				<Checkbox
					label={t('SHOULD_RECOGNIZE_TEXT')}
					checked={isText}
					onPress={() => setIsText(!isText)}
				/>
				<Button
					text={t('CONFIRM')}
					onPress={onSubmitPressed}
					style={style.button}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: 3,
	},
	textContainer: {
		width: '100%',
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
	},
	close: {
		display: 'flex',
		marginLeft: 'auto',
		padding: 3,
	},
	textInput: {
		paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 10,
	},
	body: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		width: 150,
		textAlign: 'center',
	},
});
