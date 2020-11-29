import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';

import {setActiveRoute} from '../navigationActions';

/**
 * wrap navigation in own hook for drawer menu UI
 */
export const useOwnNavigation = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const activeRoute = useSelector((state) => state.navigation.route);

	function navigate(route) {
		dispatch(setActiveRoute(route));
		navigation.navigate(route);
		navigation.closeDrawer();
	}

	return {activeRoute, navigate};
};
