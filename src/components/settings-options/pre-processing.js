import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Checkbox from '../basics/checkbox';
import Text from '../basics/text';
import SettingsHeader from './settings-header';
import {setUsePreProcessing} from '../../store/settings/settingsActions';
import style from '../../utils/styles';

/**
 * component to toggle the use of the pre-processing algorithm
 */
export default function PreProcessing() {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const preProcessing = useSelector(
		(state) => state.settings.global.preProcessing,
	);

	const [extended, toggleExtended] = useState(false);

	return (
		<View style={{paddingBottom: 15}}>
			<SettingsHeader
				header={t('PRE_PROCESSING')}
				extended={extended}
				toggleExtended={() => toggleExtended(!extended)}
			/>
			{extended && (
				<Fragment>
					<Text style={style.smallMarginBottom} size={14}>
						{t('DESCRIPTION_PRE_PROCESSING')}
					</Text>
					<Checkbox
						label={t('USE_PRE_PROCESSING')}
						checked={preProcessing}
						onPress={() => dispatch(setUsePreProcessing(!preProcessing))}
					/>
				</Fragment>
			)}
		</View>
	);
}
