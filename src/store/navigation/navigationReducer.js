import {SET_ACTIVE_ROUTE} from './navigationActions';
import {ROUTES} from '../../utils/consts';

const initState = {
	route: ROUTES.EVENTS,
};

/**
 * handling navigation state globally
 */
const navigationReducer = (state = initState, action) => {
	if (action.type === SET_ACTIVE_ROUTE) {
		return {
			...state,
			route: action.payload,
		};
	} else return state;
};

export default navigationReducer;
