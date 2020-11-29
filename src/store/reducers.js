import {combineReducers} from 'redux';

import eventReducer from './events/eventReducer';
import imageReducer from './image/imageReducer';
import navigationReducer from './navigation/navigationReducer';
import recognizeReducer from './recognize/recognizeReducer';
import resultReducer from './results/resultReducer';
import settingsReducer from './settings/settingsReducer';
import sharingReducer from './sharing/sharingReducer';

/**
 * imports all reducers and combines them to one that can be passed to the store
 */
const reducer = combineReducers({
	event: eventReducer,
	image: imageReducer,
	navigation: navigationReducer,
	recognize: recognizeReducer,
	result: resultReducer,
	settings: settingsReducer,
	sharing: sharingReducer,
});

export default reducer;
