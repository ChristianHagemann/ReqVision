import {omit} from 'lodash';

import {
	ADD_ASANA_SETTINGS,
	ADD_GITLAB_SETTINGS,
	SET_ASANA_PROJECT_ID,
	SET_ASANA_TOKEN,
	SET_GITLAB_LOCATION,
	SET_GITLAB_PROJECT_ID,
	SET_GITLAB_TOKEN,
	SET_LANGUAGE,
	SET_MICROSOFT_ENDPOINT,
	SET_MICROSOFT_KEY,
	SET_THEME_DARK,
	SET_THEME_LIGHT,
	SET_USE_PRE_PROCESSING,
} from './settingsActions';
import {DELETE_EVENT} from '../events/eventActions';
import {DARK_THEME, LIGHT_THEME, THEMING_OPTIONS} from '../../utils/themes';

const initState = {
	global: {
		microsoftEndpoint: '',
		microsoftKey: '',
		preProcessing: true,
		language: 'en',
		themeName: THEMING_OPTIONS.DARK,
		theme: DARK_THEME,
	},
	events: {},
	loading: false,
};

/**
 * reducer for settings actions (global and event specific)
 */
const settingsReducer = (state = initState, action) => {
	switch (action.type) {
		// global settings
		case SET_MICROSOFT_ENDPOINT:
			return {
				...state,
				global: {
					...state.global,
					microsoftEndpoint: action.payload,
				},
			};

		case SET_MICROSOFT_KEY:
			return {
				...state,
				global: {
					...state.global,
					microsoftKey: action.payload,
				},
			};

		case SET_USE_PRE_PROCESSING:
			return {
				...state,
				global: {
					...state.global,
					preProcessing: action.payload,
				},
			};

		case SET_LANGUAGE:
			return {
				...state,
				global: {
					...state.global,
					language: action.payload,
				},
			};

		case SET_THEME_DARK:
			return {
				...state,
				global: {
					...state.global,
					themeName: THEMING_OPTIONS.DARK,
					theme: DARK_THEME,
				},
			};

		case SET_THEME_LIGHT:
			return {
				...state,
				global: {
					...state.global,
					themeName: THEMING_OPTIONS.LIGHT,
					theme: LIGHT_THEME,
				},
			};

		// event settings
		case DELETE_EVENT:
			return {
				...state,
				events: omit(state.events, action.payload),
			};

		case ADD_ASANA_SETTINGS:
			return {
				...state,
				events: {
					...state.events,
					[action.payload]: {
						...state.events[action.payload],
						asana: {
							token: '',
							projectID: '',
						},
					},
				},
			};

		case SET_ASANA_TOKEN:
			return {
				...state,
				events: {
					...state.events,
					[action.payload.key]: {
						...state.events[action.payload.key],
						asana: {
							...state.events[action.payload.key].asana,
							token: action.payload.token,
						},
					},
				},
			};

		case SET_ASANA_PROJECT_ID:
			return {
				...state,
				events: {
					...state.events,
					[action.payload.key]: {
						...state.events[action.payload.key],
						asana: {
							...state.events[action.payload.key].asana,
							projectID: action.payload.id,
						},
					},
				},
			};

		case ADD_GITLAB_SETTINGS:
			return {
				...state,
				events: {
					...state.events,
					[action.payload]: {
						...state.events[action.payload],
						gitlab: {
							token: '',
							projectID: '',
						},
					},
				},
			};

		case SET_GITLAB_TOKEN:
			return {
				...state,
				events: {
					...state.events,
					[action.payload.key]: {
						...state.events[action.payload.key],
						gitlab: {
							...state.events[action.payload.key].gitlab,
							token: action.payload.token,
						},
					},
				},
			};

		case SET_GITLAB_LOCATION:
			return {
				...state,
				events: {
					...state.events,
					[action.payload.key]: {
						...state.events[action.payload.key],
						gitlab: {
							...state.events[action.payload.key].gitlab,
							location: action.payload.location,
						},
					},
				},
			};

		case SET_GITLAB_PROJECT_ID:
			return {
				...state,
				events: {
					...state.events,
					[action.payload.key]: {
						...state.events[action.payload.key],
						gitlab: {
							...state.events[action.payload.key].gitlab,
							projectID: action.payload.id,
						},
					},
				},
			};

		default:
			return state;
	}
};

export default settingsReducer;
