import React, {Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import Text from './basics/text';
import {useTheme} from '../store/settings/hooks/useTheme';
import {RESULT_STATUS} from '../utils/consts';

/**
 * check marks to indicate whether a result was already uploaded
 * second check shows if result was marked 'done' by user
 * TODO extra implement functionality for second check mark
 */
export default function StatusChecks(props) {
	const {t} = useTranslation();

	const [theme] = useTheme();

	const status = props.status;
	const error = props.error;

	return (
		<View style={[props.style, styles.wrapper]}>
			<Text style={styles.status} size={16}>
				{t('STATUS')}
			</Text>
			{error && <FontAwesomeIcon icon={faTimes} style={{color: theme.red}} />}
			{!error && (
				<Fragment>
					<FontAwesomeIcon
						icon={faCheck}
						style={{
							color:
								status === RESULT_STATUS.UPLOADED ||
								status === RESULT_STATUS.MARKED_DONE
									? theme.secondaryColor
									: 'grey',
							opacity:
								status === RESULT_STATUS.UPLOADED ||
								status === RESULT_STATUS.MARKED_DONE
									? 1
									: 0.5,
						}}
					/>
				</Fragment>
			)}
			{/*<FontAwesomeIcon*/}
			{/*  icon={faCheck}*/}
			{/*  style={{color: status === RESULT_STATUS.MARKED_DONE ? theme.secondaryColor : 'grey', opacity: status === RESULT_STATUS.MARKED_DONE ? 1 : 0.5}}*/}
			{/*/>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 5,
		// backgroundColor: 'green'
	},
	status: {
		paddingRight: 10,
	},
});
