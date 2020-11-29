import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Text from '../basics/text';
import {useTheme} from '../../store/settings/hooks/useTheme';

/**
 * this is a custom drawer item that provides more styling than via react-navigation
 */
export default function DrawerItem(props) {
	const [theme] = useTheme();

	const Touchable = props.disabled ? View : TouchableOpacity;

	return (
		<Touchable
			onPress={() => props.navigationPressed(props.label)}
			style={styles.drawerItem}>
			{props.icon && (
				<FontAwesomeIcon
					icon={props.icon}
					size={16}
					style={{
						color: props.disabled
							? theme.borderColor
							: props.active
							? theme.activeColor
							: theme.textColor,
					}}
				/>
			)}
			<Text
				color={
					props.disabled
						? theme.borderColor
						: props.active
						? theme.activeColor
						: theme.textColor
				}
				style={styles.text}
				size={24}>
				{props.label}
			</Text>
		</Touchable>
	);
}

const styles = StyleSheet.create({
	drawerItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
		paddingTop: 20,
	},
	text: {
		paddingLeft: 10,
	},
});
