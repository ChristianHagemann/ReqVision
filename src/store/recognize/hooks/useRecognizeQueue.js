import {useSelector} from 'react-redux';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';

/**
 * hook to return current queue of images to be recognized
 */
export const useRecognizeQueue = () => {
	const {activeEventKey} = useActiveEvent();
	const projects = useSelector((state) => state.recognize.recognizeQueue);
	const recognizeQueue = projects[activeEventKey];

	return {recognizeQueue};
};
