import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../basics/text';
import TextInput from '../basics/textinput';
import SettingsHeader from './settings-header';
import {useMicrosoftSettings} from '../../store/settings/hooks/useMicrosoftSettings';
import style from '../../utils/styles';

/**
 * component for microsoft settings (API key and endpoint)
 * neccessary for OCR
 */
export default function MicrosoftOptions() {
	const {t} = useTranslation();

	const {
		microsoftEndpoint,
		microsoftKey,
		setMicrosoftEndpoint,
		setMicrosoftKey,
	} = useMicrosoftSettings();

	const [extended, toggleExtended] = useState(false);

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('MICROSOFT_CREDENTIALS')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<Text style={style.smallMarginBottom} size={14}>
						{t('DESCRIPTION_MICROSOFT_CREDENTIALS')}
					</Text>
					<TextInput
						autoCapitalize="none"
						label={t('MICROSOFT_ENDPOINT')}
						placeholder={t('PLACEHOLDER_MICROSOFT_ENDPOINT')}
						value={microsoftEndpoint}
						onChangeText={(e) => setMicrosoftEndpoint(e)}/>
					<TextInput
						autoCapitalize="none"
						label={t('MICROSOFT_KEY')}
						placeholder={t('PLACEHOLDER_MICROSOFT_KEY')}
						value={microsoftKey}
						onChangeText={(k) => setMicrosoftKey(k)}/>
				</Fragment>
			)}
		</View>
	);
}
