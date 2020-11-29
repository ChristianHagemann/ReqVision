import React from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Text from './text';
import {useTheme} from '../../store/settings/hooks/useTheme';

/**
 * basic button component that offers displaying an icon and/or text as content
 *
 * @param props object that might contain {text, icon, disabled, loading, color, width, style, iconRight, iconSize}
 * @returns a basic functional component
 */
export default function Button(props) {
	const [theme] = useTheme();

	const Touchable = props.disabled || props.loading ? View : TouchableOpacity;

	const buttonStyle = [styles.button];
	if (props.style) {
		buttonStyle.push(props.style);
	}
	if (props.disabled) {
		buttonStyle.push({opacity: 0.5});
	}
	if (props.width) {
		buttonStyle.push({width: props.width});
	} else {
		buttonStyle.push({minWidth: 95});
	}

	return (
		<Touchable
			onPress={!props.disabled && !props.loading ? props.onPress : ''}
			style={[
				buttonStyle,
				{backgroundColor: theme.buttonColor, borderColor: theme.borderColor},
			]}>
			{props.icon && !props.iconRight && !props.loading && (
				<FontAwesomeIcon
					icon={props.icon}
					size={props.iconSize ? props.iconSize : 16}
					style={{color: props.color ? props.color : theme.buttonIcon}}
				/>
			)}
			{props.text && !props.loading && (
				<Text
					style={[
						styles.text,
						props.iconRight ? {marginRight: 4} : {marginLeft: 4},
					]}>
					{props.text}
				</Text>
			)}
			{props.icon && props.iconRight && !props.loading && (
				<FontAwesomeIcon
					icon={props.icon}
					size={props.iconSize ? props.iconSize : 16}
					style={{color: props.color ? props.color : theme.buttonIcon}}
				/>
			)}
			{props.loading && (
				<ActivityIndicator
					animating={props.loading}
					size="small"
					color={theme.secondaryColor}
				/>
			)}
		</Touchable>
	);
}

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		padding: 8,
		paddingHorizontal: 8,
		margin: 10,
		borderWidth: 2,
		minHeight: 35,
	},
	text: {
		color: 'black',
		textAlign: 'center',
	},
});
