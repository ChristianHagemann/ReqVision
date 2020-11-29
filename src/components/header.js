import React, {Fragment} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

import Text from './basics/text';
import {useActiveEvent} from '../store/events/hooks/useActiveEvent';
import {useOwnNavigation} from '../store/navigation/hooks/useOwnNavigation';
import {useShowEventDetails} from '../store/events/hooks/useShowEventDetails';
import {useTheme} from '../store/settings/hooks/useTheme';
import {ROUTES} from '../utils/consts';

/**
 * header that contains route title and menu button
 */
export const Header = ({navigation}) => {
	navigation = useNavigation();
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {showDetails} = useShowEventDetails();
	const {activeEventName} = useActiveEvent();
	const {activeRoute} = useOwnNavigation();

	const text =
		activeRoute === ROUTES.EVENTS && showDetails
			? activeEventName
			: t(activeRoute);

	return (
		<Fragment>
			{Platform.OS === 'ios' && <View style={styles.iosTop} />}
			<View style={[styles.container, {backgroundColor: theme.primaryColor}]}>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<FontAwesomeIcon
						icon={faBars}
						size={32}
						style={{color: theme.touchableColor}}
					/>
				</TouchableOpacity>
				<Text
					style={styles.text}
					size={20}
					weight="bold"
					position={{marginLeft: 'auto'}}>
					{text}
				</Text>
			</View>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 5,
		zIndex: 1000,
	},
	iosTop: {
		backgroundColor: 'white',
		height: 20,
	},
	text: {
		paddingRight: 10,
	},
});
