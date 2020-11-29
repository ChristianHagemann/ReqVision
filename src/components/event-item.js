import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Button from './basics/button';
import Text from './basics/text';
import {useActiveEvent} from '../store/events/hooks/useActiveEvent';
import {useEventActions} from '../store/events/hooks/useEventActions';
import {useShowEventDetails} from '../store/events/hooks/useShowEventDetails';
import {useTheme} from '../store/settings/hooks/useTheme';
import style from '../utils/styles';

/**
 * TODO add edit button
 */
export default function EventItem(props) {
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {activeEventKey} = useActiveEvent();
	const {setActiveEvent, deleteEvent} = useEventActions();
	const {setShowEventDetails} = useShowEventDetails();
	const active = activeEventKey === props.event.key;

	const [showRemoveModal, setShowRemoveModal] = useState(false);

	/**
	 * setting pressed event as active and "navigating" to details view
	 */
	function onEventPressed() {
		setActiveEvent(props.event.key);
		setShowEventDetails(true);
	}

	/**
	 * open promt modal to delete
	 */
	function onDeletePressed() {
		deleteEvent(props.event.key);
		setShowRemoveModal(false);
	}

	return (
		<View
			style={[
				active ? styles.selected : styles.unselected,
				{
					borderColor: active ? theme.secondaryColor : theme.borderColor,
					backgroundColor: theme.itemBackground,
				},
			]}>
			<TouchableOpacity onPress={onEventPressed} style={styles.touchable}>
				<View style={styles.labels}>
					<Text
						style={style.smallMarginBottom}
						size={20}
						weight={active ? 'bold' : 'regular'}>
						{props.event.name}
					</Text>
					<Text
						style={style.smallMarginBottom}
						weight={active ? 'bold' : 'regular'}>
						{moment(props.event.date).format('DD.MM.YYYY')}
					</Text>
				</View>
				<View style={styles.status}>
					<Button
						icon={faTrash}
						iconSize={20}
						color={theme.red}
						onPress={() => {
							setShowRemoveModal(true);
						}}
						width={40}
					/>
				</View>
			</TouchableOpacity>
			<Modal animationType="slide" transparent={true} visible={showRemoveModal}>
				<View style={[styles.modal, {backgroundColor: theme.primaryColor}]}>
					<Text size={24} style={{textAlign: 'center', paddingBottom: 5}}>
						{t('REMOVE')}
					</Text>
					<Text size={18}>
						{t('REMOVE_PROMPT_1')}
						{props.event.name}
						{t('REMOVE_PROMPT_2')}
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							paddingTop: 10,
						}}>
						<Button
							text={t('CANCEL')}
							onPress={() => {
								setShowRemoveModal(false);
							}}
						/>
						<Button text={t('REMOVE')} onPress={onDeletePressed} />
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	selected: {
		borderWidth: 3,
		borderRadius: 8,
		borderStyle: 'solid',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 4,
		marginBottom: 10,
	},
	unselected: {
		borderWidth: 2,
		borderRadius: 8,
		borderStyle: 'solid',
		padding: 5,
		marginBottom: 10,
	},
	touchable: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
	},
	labels: {
		display: 'flex',
		flexDirection: 'column',
	},
	status: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 'auto',
		alignItems: 'center',
	},
	modal: {
		display: 'flex',
		top: '20%',
		marginLeft: 15,
		marginRight: 15,
		padding: 10,
		borderRadius: 10,
		borderWidth: 3,
		maxHeight: '80%',
	},
});
