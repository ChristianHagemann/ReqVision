import React from 'react';
import {Platform, Text as RNText, View} from 'react-native';

import {useTheme} from '../../store/settings/hooks/useTheme';

/**
 * basic own text component to use instead of RNText for correct theming, font ...
 * @param props object that migth contain {weight, size, position, color, style} and all other react native text props
 * @returns basic functional text component
 */
export default function Text(props) {
	const [theme] = useTheme();

	let fontFamily =
		'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-Regular';
	switch (props.weight) {
		case 'black':
			fontFamily =
				'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-Black';
			break;
		case 'bold':
			fontFamily =
				'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-Bold';
			break;
		case 'extra':
			fontFamily =
				'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-ExtraBold';
			break;
		case 'medium':
			fontFamily =
				'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-Medium';
			break;
		case 'semi':
			fontFamily =
				'Maven' + (Platform.OS === 'android' ? ' ' : '') + 'Pro-SemiBold';
			break;
	}

	const fontSize = props.size ? props.size : 14;

	return (
		<View style={props.position}>
			<RNText
				style={[
					props.style,
					{
						fontSize: fontSize,
						fontFamily: fontFamily,
						color: props.color ? props.color : theme.textColor,
					},
				]}>
				{props.children}
			</RNText>
		</View>
	);
}
