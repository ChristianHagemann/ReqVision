import {createDrawerNavigator} from 'react-navigation-drawer';

import {CustomDrawer} from './custom-drawer';
import {CameraView} from '../../views/CameraView';
import {EditView} from '../../views/EditView';
import {EventView} from '../../views/EventView';
import {ResultView} from '../../views/ResultView';
import {SettingsView} from '../../views/SettingsView';
import {ROUTES} from '../../utils/consts';

/**
 * drawer navigator const
 * define views and drawer component and set options
 */
export const DrawerNavigation = createDrawerNavigator(
	{
		[ROUTES.CAMERA]: CameraView,
		[ROUTES.EDIT]: EditView,
		[ROUTES.EVENTS]: EventView,
		[ROUTES.RESULTS]: ResultView,
		[ROUTES.SETTINGS]: SettingsView,
	},
	{
		contentComponent: CustomDrawer,
		initialRouteName: ROUTES.EVENTS,
		drawerWidth: 250,
	},
);
