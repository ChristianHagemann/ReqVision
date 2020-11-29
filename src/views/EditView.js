import React from 'react';
import {View} from 'react-native';

import {Header} from '../components/header';
import Edit from '../components/main/edit';
import {useTheme} from '../store/settings/hooks/useTheme';

/**
 * view where the image can be cropped and tagged
 */
export const EditView = () => {
	const [theme] = useTheme();

	return (
		<View style={{height: '100%', backgroundColor: theme.primaryColor}}>
			<Header />
			<Edit />
		</View>
	);
};
