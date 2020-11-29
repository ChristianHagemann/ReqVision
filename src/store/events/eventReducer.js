import {omit} from 'lodash';

import {
	ADD_NEW_EVENT,
	DELETE_EVENT,
	EDIT_EVENT,
	SET_ACTIVE_EVENT,
	SET_DETAILS_VIEW,
} from './eventActions';

const initState = {
	active: '',
	details: false,
	events: {},
};

/**
 * reducer for handling events (add, edit, remove)
 */
const eventReducer = (state = initState, action) => {
	switch (action.type) {
		case ADD_NEW_EVENT:
			return {
				...state,
				events: {...state.events, [action.payload.key]: action.payload.event},
			};

		case EDIT_EVENT:
			return {
				...state,
			};

		case DELETE_EVENT:
			return {
				...state,
				events: omit(state.events, action.payload),
			};

		case SET_ACTIVE_EVENT:
			return {
				...state,
				active: action.payload,
			};

		case SET_DETAILS_VIEW:
			return {
				...state,
				details: action.payload,
			};

		default:
			return state;
	}
};

export default eventReducer;
