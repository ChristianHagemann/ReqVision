import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/index';

import Text from './text';
import {useTheme} from '../../store/settings/hooks/useTheme';

/**
 * basic styled checkbox component displaying check if checked
 * @param props object that might contain {disabled, style, onPress, checked, label, labelSize}
 * @returns a basic functional checkbox component
 */
export default function Checkbox(props) {
	const [theme] = useTheme();

	const Touchable = props.disabled ? View : TouchableOpacity;

	return (
		<Touchable style={[styles.component, props.style]} onPress={props.onPress}>
			<View
				style={[
					styles.box,
					{borderColor: props.disabled ? theme.grey : theme.textColor},
				]}>
				{props.checked && (
					<FontAwesomeIcon
						icon={faCheck}
						size={20}
						style={{color: theme.buttonIcon}}
					/>
				)}
			</View>
			{props.label && (
				<Text
					size={props.labelSize ? props.labelSize : 16}
					color={props.disabled ? theme.grey : theme.textColor}>
					{props.label}
				</Text>
			)}
		</Touchable>
	);
}

const styles = StyleSheet.create({
	component: {
		marginBottom: 5,
		marginRight: 20,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	box: {
		width: 24,
		height: 24,
		borderWidth: 1,
		borderRadius: 6,
		marginRight: 5,
	},
});
