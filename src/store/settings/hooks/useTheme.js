import {useSelector, useDispatch} from 'react-redux';

import {setThemeLight, setThemeDark} from '../settingsActions';
import {THEMING_OPTIONS, DARK_THEME} from '../../../utils/themes';

/**
 * hook to return current theme and functions to set
 * use DARK as fallback
 */
export const useTheme = () => {
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.settings.global.theme);
	const name = useSelector((state) => state.settings.global.themeName);
	const backgroundImage =
		name === THEMING_OPTIONS.LIGHT
			? require('../../../img/bg-light.png')
			: require('../../../img/bg-dark.png');

	function setDarkTheme() {
		dispatch(setThemeDark());
	}

	function setLightTheme() {
		dispatch(setThemeLight());
	}

	return [
		theme ?? DARK_THEME,
		backgroundImage,
		name ?? THEMING_OPTIONS.DARK,
		setDarkTheme,
		setLightTheme,
	];
};
