import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './reducers';

/**
 * creates a redux store for the Provider
 * contains the combined reducers and all middleware
 */
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: [
		'image',
		'event',
		'recognize',
		'result',
		'settings',
	],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
	let store = createStore(persistedReducer);

	let persistor = persistStore(store);

	return {store, persistor};
};
