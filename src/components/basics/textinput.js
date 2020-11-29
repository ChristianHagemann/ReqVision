import React from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';

import Text from './text';
import {useTheme} from '../../store/settings/hooks/useTheme';
import style from '../../utils/styles';

/**
 * basic text input component that has a label and is already styled in own theme
 * @param props can be {editable, label, big, ...props}
 * @returns basic functional text input component
 */
export default function TextInput(props) {
	const [theme] = useTheme();

	return (
		<View
			style={[
				style.smallMarginBottom,
				{opacity: props.editable === false ? 0.5 : 1},
			]}>
			{props.label && (
				<Text
					style={props.big ? style.smallMarginBottom : {}}
					size={props.big ? 20 : 16}>
					{props.label}
				</Text>
			)}
			<RNTextInput
				style={[
					styles.input,
					{borderColor: theme.frameColor, color: theme.textColor},
					props.style,
				]}
				{...props}
				placeholderTextColor={
					props.placeholderTextColor ? props.placeholderTextColor : 'grey'
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 2,
		borderRadius: 8,
		fontSize: 16,
		padding: 3,
		paddingLeft: 5,
		margin: 0,
	},
});
