import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Button from '../basics/button';
import Text from '../basics/text';
import EventList from '../event-list';
import NewEventModal from '../new-event-modal';
import {useEvents} from '../../store/events/hooks/useEvents';
import {useCreateKey} from '../../utils/hooks/useCreateKey';
import style from '../../utils/styles';


/**
 * component to list events and create new ones
 * main component in event view
 */
export default function Events() {
	const {t} = useTranslation();

	const {createKey} = useCreateKey();
	const {events} = useEvents();

	const [modalOpen, setModalOpen] = useState(false);
	const [eventKey, setEventKey] = useState('');

	/**
	 * already creating a key to work with so settings components can be used easily
	 */
	function addNewPressed() {
		const key = createKey();
		setEventKey(key);
		setModalOpen(true);
	}

	return (
		<View>
			<Button icon={faPlus} text={t('ADD_NEW_EVENT')} onPress={addNewPressed} />
			{events && <EventList />}
			{events.length === 0 && (
				<View style={style.noResult}>
					<Text style={style.smallMarginBottom} size={20}>
						{t('PLACEHOLDER_NO_EVENTS_YET')}
					</Text>
				</View>
			)}
			<View>
				<Modal animationType="slide" transparent={true} visible={modalOpen}>
					<NewEventModal
						eventKey={eventKey}
						onClosePressed={() => setModalOpen(false)}
					/>
				</Modal>
			</View>
		</View>
	);
}