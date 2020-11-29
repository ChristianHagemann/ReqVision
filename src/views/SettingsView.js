import React from 'react';
import {ImageBackground, View} from 'react-native';

import {Header} from '../components/header';
import Settings from '../components/main/settings';
import {useTheme} from '../store/settings/hooks/useTheme';
import style from '../utils/styles';

/**
 * view that contains all settings and options
 * the user can add tokens and keys so the results later can be shared or uploaded
 */
export const SettingsView = () => {
	const [theme, background] = useTheme();

	return (
		<View style={{height: '100%'}}>
			<Header />
			<ImageBackground
				resizeMode="cover"
				source={background}
				style={style.backgroundImage}>
				<Settings />
			</ImageBackground>
		</View>
	);
};
