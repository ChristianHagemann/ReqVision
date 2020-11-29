/**
 * string for possible themes to set in reducer
 */
export const THEMING_OPTIONS = {
	DARK: 'DARK',
	LIGHT: 'LIGHT',
};

/**
 * palette of available colors for themes
 */
const COLOR_PALETTE = {
	black: '#000208',
	white: '#FFFFFF',
	grey: '#AAB7BF',
	red: '#CB5960',

	blue: '#4ACFD4',
	blue2: '#46BAEB',

	light: '#AEE4FF',
	light2: '#92E2E8',

	darkblue: '#689AB3',
	darkblue2: '#6BC3C9',
};

/**
 * light theme with light blue as primary
 */
export const LIGHT_THEME = {
	primaryColor: '#92E2E8',
	textColor: '#000208',
	frameColor: '#000208',

	buttonColor: '#FFFFFF',
	buttonText: '#000208',
	buttonIcon: '#000208',

	activeColor: '#FFFFFF',
	touchableColor: '#FFFFFF',

	borderColor: '#AAB7BF',

	secondaryColor: COLOR_PALETTE.black,
	itemBackground: '#9CCDE6',

	black: COLOR_PALETTE.white,
	white: COLOR_PALETTE.black,
	red: COLOR_PALETTE.red,
	blue: COLOR_PALETTE.blue,
	grey: COLOR_PALETTE.grey,
};

/**
 * dark theme with black as primary
 */
export const DARK_THEME = {
	primaryColor: '#689AB3',
	textColor: '#000208',
	frameColor: '#000208',

	buttonColor: '#FFFFFF',
	buttonText: '#000208',
	buttonIcon: '#000208',

	activeColor: '#FFFFFF',
	touchableColor: '#FFFFFF',

	borderColor: '#AAB7BF',

	secondaryColor: COLOR_PALETTE.white,
	itemBackground: '#598499',

	black: COLOR_PALETTE.white,
	white: COLOR_PALETTE.black,
	red: COLOR_PALETTE.red,
	blue: COLOR_PALETTE.blue,
	grey: COLOR_PALETTE.grey,
};
