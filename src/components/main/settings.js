import React, {Fragment} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Text from '../basics/text';
import AsanaAccess from '../settings-options/asana';
import GitLabAccess from '../settings-options/gitlab';
import Language from '../settings-options/language';
import MicrosoftOptions from '../settings-options/microsoft';
import Theming from '../settings-options/theming';
import {useActiveEvent} from '../../store/events/hooks/useActiveEvent';

/**
 * settings component that has all settings options and handles the scrolling
 * main component in the settings view
 */
export default function Settings() {
	const {t} = useTranslation();

	const {activeEventKey, activeEventName} = useActiveEvent();

	const active = activeEventKey !== '';
	const height = Dimensions.get('window').height;

	const KeyboardScroll =
		Platform.OS === 'ios' ? KeyboardAwareScrollView : Fragment;

	return (
		<KeyboardScroll>
			<ScrollView
				style={[
					styles.container,
					{height: Platform.OS === 'android' ? height * 0.9 : height - 20},
				]}>
				<View>
					<Text style={{marginBottom: 10}} size={20} weight="bold">
						{t('GLOBAL_SETTINGS')}
					</Text>
					<MicrosoftOptions />
					{/*<PreProcessing/>*/}
					<Language />
					<Theming />
				</View>
				{active && (
					<View>
						<View style={styles.textContainer}>
							<Text size={20} weight="bold">
								{t('EVENT_SETTINGS')}
							</Text>
							<View style={styles.eventText}>
								<Text size={20} weight="bold">
									{activeEventName}
								</Text>
							</View>
						</View>
						<AsanaAccess />
						<GitLabAccess />
					</View>
				)}
			</ScrollView>
		</KeyboardScroll>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 40,
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
	},
	eventText: {
		display: 'flex',
		marginLeft: 'auto',
		marginRight: 10,
	},
});
