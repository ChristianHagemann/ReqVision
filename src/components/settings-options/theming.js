import React, {Fragment, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Checkbox from '../basics/checkbox';
import SettingsHeader from './settings-header';
import {useTheme} from '../../store/settings/hooks/useTheme';
import {DARK_THEME, LIGHT_THEME, THEMING_OPTIONS} from '../../utils/themes';


/**
 * component for choosing different color themes
 * currently dark and light
 */
export default function Theming() {
	const {t} = useTranslation();

	const [theme, backgroundImage,  name, setDarkTheme, setLightTheme] = useTheme();

	const [extended, toggleExtended] = useState(false);

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('CHOOSE_THEME')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<View style={styles.row}>
						<View style={styles.boxWrapper}>
							<Checkbox
								label={t('THEME_DARK')}
								checked={name === THEMING_OPTIONS.DARK}
								onPress={() => {
									setDarkTheme();
								}}
							/>
						</View>
						<View
							style={[styles.colorPalette, {borderColor: theme.frameColor}]}>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: DARK_THEME.primaryColor},
								]}
							/>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: DARK_THEME.textColor},
								]}
							/>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: DARK_THEME.buttonColor},
								]}
							/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.boxWrapper}>
							<Checkbox
								label={t('THEME_LIGHT')}
								checked={name === THEMING_OPTIONS.LIGHT}
								onPress={() => {
									setLightTheme();
								}}
							/>
						</View>
						<View
							style={[styles.colorPalette, {borderColor: theme.frameColor}]}>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: LIGHT_THEME.primaryColor},
								]}
							/>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: LIGHT_THEME.buttonColor},
								]}
							/>
							<View
								style={[
									styles.colorElement,
									{backgroundColor: LIGHT_THEME.textColor},
								]}
							/>
						</View>
					</View>
				</Fragment>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 5,
	},
	boxWrapper: {
		width: '30%',
	},
	colorPalette: {
		display: 'flex',
		flexDirection: 'row',
		width: '50%',
		borderWidth: 2,
		borderRadius: 3,
	},
	colorElement: {
		flex: 1,
	},
});
