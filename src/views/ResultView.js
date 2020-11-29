import React from 'react';
import {ImageBackground, View} from 'react-native';

import {Header} from '../components/header';
import ResultList from '../components/main/result-list';
import {useTheme} from '../store/settings/hooks/useTheme';
import style from '../utils/styles';

/**
 * view containing the results for the current event
 */
export const ResultView = () => {
	const [theme, background] = useTheme();

	return (
		<View>
			<Header />
			<ImageBackground
				resizeMode="cover"
				source={background}
				style={style.backgroundImage}>
				<ResultList />
			</ImageBackground>
		</View>
	);
};
