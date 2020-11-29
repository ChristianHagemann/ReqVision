import React from 'react';
import {StyleSheet, View} from 'react-native';
import {reverse} from 'lodash';

import EventItem from './event-item';
import {useEvents} from '../store/events/hooks/useEvents';

/**
 * listing all existing events
 */
export default function EventList() {
	const {events} = useEvents();

	return (
		<View style={styles.list}>
			{reverse(events).map(function(event, index) {
				return <EventItem key={index} event={event} />;
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});
