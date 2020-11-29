import React from 'react';
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import Text from './basics/text';
import {useTheme} from '../store/settings/hooks/useTheme';
import style from '../utils/styles';

/**
 * component to show image preview in larger
 */
export default function PreviewModal(props) {
	const {t} = useTranslation();

	const [theme] = useTheme();

	return (
		<View
			style={[
				styles.previewModal,
				{backgroundColor: theme.primaryColor, borderColor: theme.frameColor},
			]}>
			<View style={style.modalHeader}>
				<View style={{width: '100%'}}>
					<Text style={{textAlign: 'center'}} size={20}>
						{t('PREVIEW')}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => {
						props.onPreviewClose();
						addNewLog(LOG.PREVIEW_CLOSED, ACTIONS.PRESS);
					}}
					style={style.modalClose}>
					<FontAwesomeIcon
						icon={faTimes}
						size={16}
						style={{color: theme.secondaryColor}}
					/>
				</TouchableOpacity>
			</View>
			<Image
				resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
				source={{uri: props.image}}
				style={{flex: 1, margin: 2}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	previewModal: {
		display: 'flex',
		margin: 5,
		borderWidth: 3,
		borderRadius: 10,
		top: '10%',
		minHeight: '70%',
		maxHeight: '80%',
	},
});
