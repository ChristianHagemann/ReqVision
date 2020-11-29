import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import Button from './basics/button';
import Checkbox from './basics/checkbox';
import Text from './basics/text';
import TextInput from './basics/textinput';
import AsanaAccess from './settings-options/asana';
import GitLabAccess from './settings-options/gitlab';
import {useEventActions} from '../store/events/hooks/useEventActions';
import {useShowEventDetails} from '../store/events/hooks/useShowEventDetails';
import {
	addAsanaSettings,
	addGitlabSettings,
} from '../store/settings/settingsActions';
import {useTheme} from '../store/settings/hooks/useTheme';
import style from '../utils/styles';


/**
 * modal to set up a new event
 */
export default function NewEventModal(props) {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const [theme] = useTheme();
	const {setActiveEvent, addNewEvent} = useEventActions();
	const {setShowEventDetails} = useShowEventDetails();

	const [name, setName] = useState('');
	const [addAsana, setAddAsana] = useState(false);
	const [addGitlab, setAddGitlab] = useState(false);

	const key = props.eventKey;

	function toggleAsanaPressed() {
		if (!addAsana) {
			dispatch(addAsanaSettings(key));
		}
		// TODO future work - could remove asana setting to clean up reducer with e.g.:
		// else {dispatch(removeAsanaSettings(key))};
		setAddAsana(!addAsana);
	}

	function toggleGitlabPressed() {
		if (!addGitlab) {
			dispatch(addGitlabSettings(key));
		}
		// TODO future work - could remove gitlab setting to clean up reducer with e.g.:
		// else {dispatch(removeGitlabSettings(key));}
		setAddGitlab(!addGitlab);
	}

	/**
	 * add a new event
	 */
	function addEventPressed() {
		addNewEvent(key, name);
		props.onClosePressed();
		setActiveEvent(key);
		setShowEventDetails(true);
	}

	/**
	 * 
	 */
	function closePressed() {
		props.onClosePressed();
	}

	return (
		<View
			style={[
				style.modalStyle,
				{
					top: '10%',
					maxHeight: 450,
					backgroundColor: theme.primaryColor,
					borderColor: theme.borderColor,
				},
			]}>
			<ScrollView
				style={styles.scrollView}
				persistentScrollbar={true}
				indicatorStyle={'white'}>
				<View style={styles.header}>
					<View style={styles.textContainer}>
						<Text style={styles.text} size={20}>
							{t('ADD_NEW_EVENT')}
						</Text>
					</View>
					<TouchableOpacity onPress={closePressed} style={styles.close}>
						<FontAwesomeIcon
							icon={faTimes}
							size={16}
							style={{color: theme.secondaryColor}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.options}>
					<TextInput
						autoCapitalize="words"
						autoComplete="off"
						big={true}
						label={t('NAME')}
						placeholder={t('PLACEHOLDER_EVENT_NAME')}
						value={name}
						onChangeText={(n) => setName(n)}
					/>
					<View style={styles.checkboxes}>
						<Text style={style.smallMarginBottom} size={20}>
							{t('CONNECT_EVENT')}
						</Text>
						<Text style={style.smallMarginBottom} size={14}>
							{t('DESCRIPTION_ADD_REMOTE_EVENT')}
						</Text>
						<Checkbox
							label={t('ADD_ASANA_CONNECTION')}
							checked={addAsana}
							onPress={toggleAsanaPressed}
						/>
						<Checkbox
							label={t('ADD_GITLAB_CONNECTION')}
							checked={addGitlab}
							onPress={toggleGitlabPressed}
						/>
					</View>
					{addAsana && <AsanaAccess currentKey={key} />}
					{addGitlab && <GitLabAccess currentKey={key} />}
				</View>
			</ScrollView>
			<Button
				disabled={name === ''}
				text={t('CONFIRM')}
				onPress={addEventPressed}
				style={style.button}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		height: '65%',
		margin: 5,
	},
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
	},
	close: {
		display: 'flex',
		marginLeft: 'auto',
		padding: 3,
	},
	options: {
		paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 10,
	},
});