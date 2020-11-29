import {v4 as uuid} from 'uuid';

/**
 * helper hook that creates a unique key
 */
export const useCreateKey = () => {
	function createKey() {
		return uuid();
	}

	return {createKey};
};
