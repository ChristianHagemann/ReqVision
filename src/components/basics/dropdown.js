import React, {useState} from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons/index';

import Text from './text';
import {useTheme} from '../../store/settings/hooks/useTheme';

/**
 * basic dropdown component that supports label, items array and translation for items
 * @param props object that might contain {disabled, onValueChange, zIndex, loading, label, translate, loading, placeholder, items}
 * @returns basic functional dropdown component
 */
export default function Dropdown(props) {
	const {t} = useTranslation();
	const [theme] = useTheme();

	const [extended, setExtended] = useState(false);

	const Touchable = props.disabled ? View : TouchableOpacity;

	function onValueChange(item) {
		props.onValueChange(item);
		setExtended(false);
	}

	return (
		<View style={[styles.dropdown, {zIndex: props.zIndex}]}>
			<Touchable
				style={[styles.header, {borderColor: theme.frameColor}]}
				onPress={() => setExtended(!extended)}>
				{props.loading && (
					<ActivityIndicator
						animating={props.loading}
						size="small"
						color={theme.textColor}
					/>
				)}
				{!props.loading && (
					<Text size={20} color={props.disabled ? theme.grey : theme.textColor}>
						{props.translate && props.label
							? t([props.label])
							: props.label
							? props.label
							: props.placeholder}
					</Text>
				)}
				<FontAwesomeIcon
					icon={extended ? faCaretUp : faCaretDown}
					size={24}
					style={{
						marginLeft: 'auto',
						paddingRight: 10,
						color: props.disabled ? theme.grey : theme.textColor,
					}}
				/>
			</Touchable>
			{extended && (
				<ScrollView
					style={[
						styles.options,
						{
							backgroundColor: theme.itemBackground,
							borderColor: theme.frameColor,
						},
					]}>
					{props.items.map(function(item, index) {
						return (
							<TouchableOpacity
								key={index}
								style={styles.item}
								onPress={() => onValueChange(item)}>
								<Text size={20}>
									{props.translate ? t([item.label]) : item.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	dropdown: {
		display: 'flex',
		justifyContent: 'center',
		margin: 3,
		paddingLeft: 2,
		paddingRight: 2,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		borderWidth: 2,
		borderRadius: 5,
		paddingLeft: 5,
	},
	options: {
		width: '100%',
		maxHeight: 200,
		borderWidth: 2,
		borderRadius: 5,
		padding: 2,
		position: 'relative',
		top: 3,
	},
	item: {
		paddingLeft: 5,
		paddingBottom: 3,
	},
});
