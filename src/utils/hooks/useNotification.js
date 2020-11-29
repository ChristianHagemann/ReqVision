import {useTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';

/**
 * helper hook to make show message function for notifications easier to use
 * @param message to display
 */
export const useNotification = () => {
	const {t} = useTranslation();

	function showSuccess(message) {
		showMessage({
			type: 'success',
			message: t('SUCCESS'),
			description: message,
			duration: 1500,
		});
	}

	function showError(message) {
		showMessage({
			type: 'danger',
			message: t('ERROR'),
			description: message,
			duration: 1500,
		});
	}

	function showInfo(message, duration) {
		showMessage({
			type: 'info',
			message: t('INFO'),
			description: message,
			duration: duration ? duration : 300,
		});
	}

	return {showSuccess, showError, showInfo};
};
