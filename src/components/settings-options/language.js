import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Checkbox from '../basics/checkbox';
import SettingsHeader from './settings-header';
import {useLanguage} from '../../store/settings/hooks/useLanguage';


/**
 * component that handles language change
 */
export default function Language() {
	const {t} = useTranslation();

	const {lang, setLanguage} = useLanguage();
	const [extended, toggleExtended] = useState(false);

	/**
	 * change the language globally and in store for display
	 */
	function changeLanguagePressed(l) {
		setLanguage(l);
	}

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('HEADER_CHANGE_LANGUAGE')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<Checkbox
						label={t('ENGLISH')}
						checked={lang === 'en'}
						onPress={() => changeLanguagePressed('en')}
						style={{paddingBottom: 5}}
					/>
					<Checkbox
						label={t('GERMAN')}
						checked={lang === 'de'}
						onPress={() => changeLanguagePressed('de')}
					/>
				</Fragment>
			)}
		</View>
	);
}
