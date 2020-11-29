import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Dropdown from './basics/dropdown';
import TextInput from './basics/textinput';
import {useHandleSharingOptions} from '../store/sharing/hooks/useHandleSharingOptions';
import {useIssues} from '../store/sharing/hooks/useIssues';
import {useSharingOptions} from '../store/sharing/hooks/useSharingOptions';
import {useSelectedIssue} from '../store/sharing/hooks/useSelectedIssue';
import {
	SHARING_OPERATIONS,
	SHARING_PLATFORMS,
	SHARING_STRINGS,
} from '../utils/consts';


/**
 *
 */
export default function SharingOptions() {
	const {t} = useTranslation();

	const {platform, operation, email} = useSharingOptions();
	const {setPlatform, setOperation, setMail} = useHandleSharingOptions();
	const {issues, clearIssues, loading} = useIssues();
	const {selectedIssue, setIssue} = useSelectedIssue();

	/**
	 * set the selected platform in reducer
	 */
	function platformChange(item) {
		setPlatform(item);
		setOperation(null);
		setIssue(null);
		clearIssues();
	}

	/**
	 *
	 */
	function sendMailChange(item) {
		setMail(item);
	}

	/**
	 * set the selected operation type in reducer
	 */
	function operationChange(item) {
		setOperation(item);
		setIssue(null);
	}

	/**
	 * set the selected issue to comment in reducer
	 */
	function issueSelected(item) {
		setIssue(item);
	}

	return (
		<View>
			<Dropdown
				placeholder={t('PLACEHOLDER_SELECT_PLATFORM')}
				items={SHARING_PLATFORMS}
				// zIndex={10}
				label={platform ? platform.label : null}
				value={platform ? platform.value : null}
				onValueChange={platformChange}
			/>
			{platform && platform.value !== SHARING_STRINGS.EMAIL && (
				<Dropdown
					placeholder={t('PLACEHOLDER_SELECT_OPERATION')}
					items={
						platform && platform.value ? SHARING_OPERATIONS[platform.value] : []
					}
					translate={true}
					// zIndex={9}
					onValueChange={operationChange}
					label={operation ? operation.label : null}
					value={operation ? operation.value : null}
					disabled={!platform}
				/>
			)}
			{platform && platform.value === SHARING_STRINGS.EMAIL && (
				<View style={{margin: 5}}>
					<TextInput
						autoCapitalize="none"
						autoComplete="off"
						keyboardType="email-address"
						placeholder={t('PLACEHOLDER_MAIL_TO')}
						value={email}
						onChangeText={(mail) => sendMailChange(mail)}
					/>
				</View>
			)}
			{operation && operation.value === SHARING_STRINGS.COMMENT && (
				<Dropdown
					placeholder={t('PLACEHOLDER_SELECT_ISSUE')}
					items={issues}
					// zIndex={8}
					onValueChange={issueSelected}
					label={selectedIssue ? selectedIssue.label : null}
					value={selectedIssue ? selectedIssue.value : null}
					disabled={issues.length === 0}
					loading={loading}
				/>
			)}
		</View>
	);
}
