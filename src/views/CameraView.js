import React from 'react';
import {View} from 'react-native';

import {Header} from '../components/header';
import {Camera} from '../components/main/camera';

/**
 * view containing the camera component
 */
export const CameraView = () => {
	return (
		<View style={{height: '100%'}}>
			<Header />
			<Camera />
		</View>
	);
};
