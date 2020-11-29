import React from 'react';
import {
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
	faCalendarDay,
	faCamera,
	faCog,
	faPollH,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

import DrawerItem from './drawer-item';
import {setDetailsView} from '../../store/events/eventActions';
import {useActiveEvent} from '../../store/events/hooks/useActiveEvent';
import {useEventImages} from '../../store/image/hooks/useEventImages';
import {useOwnNavigation} from '../../store/navigation/hooks/useOwnNavigation';
import {useTheme} from '../../store/settings/hooks/useTheme';
import {ROUTES} from '../../utils/consts';

/**
 * custom drawer navigator component
 */
export const CustomDrawer = (props) => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const navigation = useNavigation();
	const {activeRoute, navigate} = useOwnNavigation();

	const [theme] = useTheme();
	const {eventImages} = useEventImages();
	const {activeEventKey} = useActiveEvent();

	/**
	 * navigate to events view
	 * set details to false to get to overview
	 */
	function eventsPressed() {
		navigate(ROUTES.EVENTS);
		dispatch(setDetailsView(false));
	}

	return (
		<View
			style={[
				styles.drawer,
				{
					backgroundColor: theme.primaryColor,
					marginTop: Platform.OS === 'android' ? 0 : 20,
				},
			]}
			contentOptions>
			<TouchableOpacity
				onPress={() => navigation.closeDrawer()}
				style={{margin: 5}}>
				<FontAwesomeIcon
					icon={faTimes}
					size={24}
					style={{color: theme.touchableColor}}
				/>
			</TouchableOpacity>
			<DrawerItem
				label={t(ROUTES.EVENTS)}
				icon={faCalendarDay}
				navigationPressed={eventsPressed}
				active={activeRoute === ROUTES.EVENTS}
			/>
			<DrawerItem
				label={t(ROUTES.CAMERA)}
				icon={faCamera}
				navigationPressed={() => {
					navigate(ROUTES.CAMERA);
				}}
				active={activeRoute === ROUTES.CAMERA}
			/>
			<DrawerItem
				label={t(ROUTES.RESULTS)}
				icon={faPollH}
				navigationPressed={() => {
					navigate(ROUTES.RESULTS);
				}}
				active={activeRoute === ROUTES.RESULTS}
				disabled={!activeEventKey || eventImages.length === 0}
			/>
			<DrawerItem
				label={t(ROUTES.SETTINGS)}
				icon={faCog}
				navigationPressed={() => {
					navigate(ROUTES.SETTINGS);
				}}
				active={activeRoute === ROUTES.SETTINGS}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	drawer: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 5,
		paddingLeft: 10,
	},
});
