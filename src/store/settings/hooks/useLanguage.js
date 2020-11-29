import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {setLanguage} from '../settingsActions';

/**
 * hook to persist language settings
 */
export const useLanguage = () => {
	const {i18n} = useTranslation();
	const dispatch = useDispatch();
	const lang = useSelector((state) => state.settings.global.language);

	function setLang(l) {
		i18n.changeLanguage(lang).then(() => {
			dispatch(setLanguage(l));
		});
	}

	useEffect(() => {
		i18n.changeLanguage(lang).then(() => {});
	}, [i18n, lang]);

	return {lang, setLanguage: setLang};
};
