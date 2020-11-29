import React, {Fragment, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import SettingsHeader from './settings-header';
import TextInput from '../basics/textinput';
import {useActiveEvent} from '../../store/events/hooks/useActiveEvent';
import {useGitlabSettings} from '../../store/settings/hooks/useGitlabSettings';
import style from '../../utils/styles';

/**
 * component for the settings that lets the user enter their gitlab access token
 * the token is later used to connect to a repository and upload the results
 */
export default function GitLabAccess(props) {
	const {t} = useTranslation();

	const {activeEventKey} = useActiveEvent();
	const key = props.currentKey ? props.currentKey : activeEventKey;
	const {
		glToken,
		glLocation,
		glProjectID,
		setGitlabToken,
		setGitlabLocation,
		setGitlabProjectID,
	} = useGitlabSettings(key);

	const [extended, toggleExtended] = useState(false);

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('CONNECT_GITLAB')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<Text style={style.smallMarginBottom} size={14}>
						{t('DESCRIPTION_GITLAB_CONNECTION')}
					</Text>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						label={t('GITLAB_ACCESS_TOKEN')}
						placeholder={t('PLACEHOLDER_ACCESS_TOKEN')}
						value={glToken}
						onChangeText={(t) => setGitlabToken(t)}/>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						label={t('GITLAB_REPOSITORY')}
						placeholder={t('PLACEHOLDER_GITLAB_REPOSITORY')}
						value={glLocation}
						onChangeText={(url) => setGitlabLocation(url)}/>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						keyboardType="numeric"
						type="number"
						label={t('PROJECT_ID')}
						placeholder={t('PLACEHOLDER_PROJECT_ID')}
						value={glProjectID}
						onChangeText={(id) => setGitlabProjectID(id)}/>
				</Fragment>
			)}
		</View>
	);
}
