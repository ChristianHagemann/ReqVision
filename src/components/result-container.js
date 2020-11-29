import React, {Fragment, useState} from 'react';
import {
	Image,
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
	Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
	faCaretDown,
	faCaretUp,
	faFlask,
} from '@fortawesome/free-solid-svg-icons';

import Button from './basics/button';
import Checkbox from './basics/checkbox';
import Text from './basics/text';
import TextInput from './basics/textinput';
import PreviewModal from './preview-modal';
import StatusChecks from './status-checks';
import {useRecognitionApi} from '../store/recognize/hooks/useRecognitionApi';
import {useEditResultElement} from '../store/results/hooks/useEditResultElement';
import {useTheme} from '../store/settings/hooks/useTheme';
import {useSharingQueue} from '../store/sharing/hooks/useSharingQueue';
import {RESULT_STATUS, TYPES} from '../utils/consts';
import style from '../utils/styles';


/**
 * a multiline text-input with the last result of text recognition for the user to edit
 */
export default function ResultContainer(props) {
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {startQueue} = useRecognitionApi();
	const {editText} = useEditResultElement();
	const {addToQueue, removeFromQueue, isSelected} = useSharingQueue();
	const selected = isSelected(props.result.key);

	const [extended, setExtended] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);

	const error =
		props.result.status &&
		props.result.status.startsWith('error') &&
		props.result.status !== RESULT_STATUS.UPLOAD_ERROR;

	/**
	 * add or remove a result from the sharingQueue
	 */
	function checkboxPressed() {
		if (!selected) {
			addToQueue(props.result.key);
		} else {
			removeFromQueue(props.result.key);
		}
	}

	/**
	 * toggle modal showing a larger original image
	 */
	function togglePreview() {
		setPreviewOpen(!previewOpen);
	}

	/**
	 * update the text in textarea but also in resultReducer
	 * if result has already been added to the queue also update queue element to get latest changes
	 */
	function textChanged(text) {
		editText(props.result.key, text);
	}

	/**
	 * start the recognition queue again with only one image in it
	 */
	function retryRecognition() {
		startQueue(props.result.key);
	}

	return (
		<View style={[styles.container, {backgroundColor: theme.itemBackground}]}>
			<View style={styles.headerContainer}>
				<View style={styles.flexOne}>
					<Checkbox
						checked={selected}
						disabled={props.result.type === TYPES.TEXT && !props.result.text}
						onPress={checkboxPressed}
						style={{marginBottom: 0}}
					/>
				</View>
				<TouchableOpacity
					onPress={() => {
						setExtended(!extended);
					}}
					style={[styles.flexOne, {alignItems: 'center'}]}>
					<Text size={20}>
						{t('RESULT')} {props.index + 1}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setExtended(!extended);
					}}
					style={styles.flexOne}>
					<FontAwesomeIcon
						icon={extended ? faCaretUp : faCaretDown}
						size={24}
						style={{
							display: 'flex',
							marginLeft: 'auto',
							color: theme.textColor,
						}}
					/>
				</TouchableOpacity>
			</View>
			{extended && (
				<Fragment>
					<View
						style={
							props.result.type === TYPES.TEXT
								? styles.withText
								: styles.onlyImage
						}>
						{props.result.type === TYPES.TEXT && (
							<View style={styles.textWrapper}>
								<TextInput
									label={t('RECOGNIZED_TEXT')}
									placeholder={t('PLACEHOLDER_EMPTY_RESULT_TEXT_INPUT')}
									placeholderTextColor="darkgrey"
									defaultValue={props.result.text}
									value={props.result.text}
									onChangeText={(t) => textChanged(t)}
									multiline={true}
									textAlignVertical="top"
									numberOfLines={5}
								/>
							</View>
						)}
						{props.result.source && (
							<View
								style={
									props.result.type === TYPES.TEXT
										? [style.pullLeft, {width: '30%'}]
										: styles.onlyImage
								}>
								<StatusChecks
									status={props.result.status}
									error={error}
									style={styles.checks}
								/>
								<TouchableOpacity
									onPress={togglePreview}
									style={{display: 'flex', height: 100, width: 'auto'}}>
									<Image
										resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
										source={{uri: props.result.source}}
										style={{flex: 1}}
									/>
								</TouchableOpacity>
							</View>
						)}
					</View>
					{error && (
						<Button
							text={t('RETRY')}
							icon={faFlask}
							onPress={retryRecognition}
						/>
					)}
				</Fragment>
			)}
			<Modal animationType="slide" transparent={true} visible={previewOpen}>
				<PreviewModal
					image={props.result.source}
					onPreviewClose={togglePreview}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		margin: 5,
		borderRadius: 5,
		marginBottom: 12,
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	flexOne: {
		display: 'flex',
		flex: 1,
	},
	withText: {
		display: 'flex',
		flexDirection: 'row',
	},
	onlyImage: {
		height: 150,
	},
	textWrapper: {
		flex: 1,
		marginRight: 10,
	},
	checks: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	image: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
