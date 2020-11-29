import React, {createContext} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createAppContainer} from 'react-navigation';
import FlashMessage from 'react-native-flash-message';

import {DrawerNavigation} from './src/components/navigation/navigator';
import store from './src/store/store';

export const AppContext = createContext(true);

const ApplicationContainer = createAppContainer(DrawerNavigation);

/**
 * main app container wrapped in store provider and persistor
 * flash message component on same level to always be on top of components
 */
export default () => {
	const st = store().store;
	const persistor = store().persistor;

	return (
		<Provider store={st}>
			<PersistGate loading={null} persistor={persistor}>
				<ApplicationContainer />
				<FlashMessage position="bottom" />
			</PersistGate>
		</Provider>
	);
};
