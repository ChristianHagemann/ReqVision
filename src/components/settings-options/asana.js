import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../basics/text';
import TextInput from '../basics/textinput';
import SettingsHeader from './settings-header';
import {useActiveEvent} from '../../store/events/hooks/useActiveEvent';
import {useAsanaSettings} from '../../store/settings/hooks/useAsanaSettings';
import style from '../../utils/styles';

/**
 * component for settings to connect user to asana
 */
export default function AsanaAccess(props) {
	const {t} = useTranslation();

	const {activeEventKey} = useActiveEvent();
	const key = props.currentKey ? props.currentKey : activeEventKey;
	const {
		asToken,
		asProjectID,
		setAsanaToken,
		setAsanaProjectID,
	} = useAsanaSettings(key);

	const [extended, toggleExtended] = useState(false);

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('CONNECT_ASANA')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<Text style={style.smallMarginBottom} size={14}>
						{t('DESCRIPTION_ASANA_CONNECTION')}
					</Text>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						label={t('ASANA_ACCESS_TOKEN')}
						placeholder={t('PLACEHOLDER_ACCESS_TOKEN')}
						value={asToken}
						onChangeText={(t) => setAsanaToken(t)}/>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						keyboardType="numeric"
						type="number"
						label={t('PROJECT_ID')}
						placeholder={t('PLACEHOLDER_PROJECT_ID')}
						value={asProjectID}
						onChangeText={(id) => setAsanaProjectID(id)}/>
				</Fragment>
			)}
		</View>
	);
}
