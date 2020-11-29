import {useSelector, useDispatch} from 'react-redux';
import {setSelectedIssue} from '../sharingActions';

/**
 * hook to use and set the currently selected issue
 */
export const useSelectedIssue = () => {
	const dispatch = useDispatch();

	const selectedIssue = useSelector((state) => state.sharing.selectedIssue);

	function setIssue(issue) {
		dispatch(setSelectedIssue(issue));
	}

	return {selectedIssue, setIssue};
};
