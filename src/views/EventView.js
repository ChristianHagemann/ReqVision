import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Header} from '../components/header';
import Events from '../components/main/events';
import ImageList from '../components/image-list';
import {useShowEventDetails} from '../store/events/hooks/useShowEventDetails';
import {useEventImages} from '../store/image/hooks/useEventImages';
import {useOwnNavigation} from '../store/navigation/hooks/useOwnNavigation';
import {useTheme} from '../store/settings/hooks/useTheme';
import {useNotification} from '../utils/hooks/useNotification';
import {ROUTES} from '../utils/consts';
import style from '../utils/styles';

/**
 * view to add and manage events (e.g. workshops)
 */
export const EventView = () => {
	const {t} = useTranslation();

	const {activeRoute} = useOwnNavigation();
	const [theme, background] = useTheme();
	const {eventImages} = useEventImages();
	const {showDetails} = useShowEventDetails();
	const {showInfo} = useNotification();

	useEffect(() => {
		if (showDetails && activeRoute === ROUTES.EVENTS) {
			showInfo(t('INFO_PRESS_EDIT_HOLD_ANALYZE'), 3000);
		}
	}, [showDetails, activeRoute, showInfo, t]);

	return (
		<View style={{height: '100%'}}>
			<Header />
			<ImageBackground
				resizeMode="cover"
				source={background}
				style={style.backgroundImage}>
				{!showDetails && <Events />}
				{showDetails && <ImageList images={eventImages} />}
			</ImageBackground>
		</View>
	);
};
