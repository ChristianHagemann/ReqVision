import {indexOf, union} from 'lodash';
import {
	ADD_TO_SHARING_QUEUE,
	CLEAR_ISSUES,
	CLEAR_SHARING_OPTIONS,
	REMOVE_FROM_SHARING_QUEUE,
	SET_LOADING,
	SET_SELECTED_ISSUE,
	SET_SHARING_ISSUES,
	SET_SHARING_OPERATION,
	SET_SHARING_PLATFORM,
	SET_SHARING_MAIL,
} from './sharingActions';

const initState = {
	loading: false,
	sharingQueue: [],
	platform: null,
	operation: null,
	issues: [],
	selectedIssue: null,
	email: null,
};

/**
 * reducer for the sharing wizard and for preparing the request
 */
const sharingReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};

		case SET_SHARING_PLATFORM:
			return {
				...state,
				platform: action.payload,
			};

		case SET_SHARING_OPERATION:
			return {
				...state,
				operation: action.payload,
			};

		case SET_SHARING_ISSUES:
			return {
				...state,
				issues: action.payload,
			};

		case SET_SELECTED_ISSUE:
			return {
				...state,
				selectedIssue: action.payload,
			};

		case SET_SHARING_MAIL:
			return {
				...state,
				email: action.payload,
			};

		case CLEAR_ISSUES:
			return {
				...state,
				issues: [],
			};

		case ADD_TO_SHARING_QUEUE:
			return {
				...state,
				sharingQueue: union([...state.sharingQueue], [action.payload]),
			};

		case REMOVE_FROM_SHARING_QUEUE:
			const idx = indexOf(state.sharingQueue, action.payload);
			const afterRemove =
				state.sharingQueue.length > 1
					? [
							...state.sharingQueue.slice(0, idx),
							...state.sharingQueue.slice(idx + 1),
					  ]
					: [];
			return {
				...state,
				sharingQueue: afterRemove,
			};

		case CLEAR_SHARING_OPTIONS:
			return initState;

		default:
			return state;
	}
};

export default sharingReducer;
