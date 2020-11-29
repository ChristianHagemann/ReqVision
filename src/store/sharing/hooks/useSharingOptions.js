import {useSelector} from 'react-redux';

/**
 * hook to get sharing options platform and operation
 */
export const useSharingOptions = () => {
	const platform = useSelector((state) => state.sharing.platform);
	const operation = useSelector((state) => state.sharing.operation);
	const email = useSelector((state) => state.sharing.email);

	return {platform, operation, email};
};
