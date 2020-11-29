import {Alert} from 'react-native';
import Mailer from 'react-native-mail';
import {useTranslation} from 'react-i18next';
import {get} from 'lodash';

import {useActiveEvent} from '../../events/hooks/useActiveEvent';
import {useResultsMap} from '../../results/hooks/useResultsMap';
import {useSharingOptions} from './useSharingOptions';
import {useFormatRequest} from '../../../utils/hooks/useFormatRequest';
import {useSharingQueue} from './useSharingQueue';
import {RESULT_STATUS} from '../../../utils/consts';
import {useEditResultElement} from '../../results/hooks/useEditResultElement';

/**
 * hook to send mails with files for sharing
 */
export const useSendMail = () => {
	const {t} = useTranslation();
	const {activeEventName} = useActiveEvent();
	const {email} = useSharingOptions();
	const {sharingQueue} = useSharingQueue();
	const {results} = useResultsMap();

	const {editStatus} = useEditResultElement();
	const {setHtmlLineBreaks} = useFormatRequest();

	/**
	 *
	 */
	function openMailClient() {
		const subject = t('MAIL_SUBJECT');
		let body = '';
		let attachments = [];

		for (let i = 0; i < sharingQueue.length; i++) {
			let key = sharingQueue[i];
			let obj = get(results, key);
			if (obj.text) {
				body = body + '<p>' + setHtmlLineBreaks(obj.text) + '</p>';
			}
			if (obj.source) {
				attachments.push({
					path: obj.source,
					type: 'jpg',
				});
			}
		}

		Mailer.mail(
			{
				subject: subject + '"' + activeEventName + '"',
				recipients: [email],
				body: body,
				isHTML: true,
				attachments: attachments,
			},
			(error, event) => {
				let title = '';
				let message = '';
				if (error === 'not_available') {
					title = t('MAIL_NOT_AVAILABLE_TITLE');
					message = t('MAIL_NOT_AVAILABLE_MESSAGE');
				}
				if (event === 'sent') {
					title = t('MAIL_SENT_TITLE');
					message = t('MAIL_SENT_MESSAGE');
					for (let i = 0; i < sharingQueue.length; i++) {
						let key = sharingQueue[i];
						editStatus(key, RESULT_STATUS.UPLOADED);
					}
				}
				if (event === 'cancelled') {
					title = t('MAIL_CANCELLED_TITLE');
					message = t('MAIL_CANCELLED_MESSAGE');
				}
				Alert.alert(
					title,
					message === '' ? event : message,
					[{text: t('OK')}, {text: t('CANCEL')}],
					{cancelable: true},
				);
			},
		);
	}

	return {openMailClient};
};
