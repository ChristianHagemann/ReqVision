import React, {Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';

import Text from '../basics/text';
import {useTheme} from '../../store/settings/hooks/useTheme';
import style from '../../utils/styles';

/**
 * component for the header of a single setting in settings view
 */
export default function SettingsHeader(props) {
	const [theme] = useTheme();

	return (
		<Fragment>
			<TouchableOpacity
				onPress={props.toggleExtended}
				style={style.headerContainer}>
				<Text style={style.smallMarginBottom} size={20}>
					{props.header}
				</Text>
				<FontAwesomeIcon
					icon={props.extended ? faCaretUp : faCaretDown}
					size={24}
					style={{marginLeft: 'auto', paddingRight: 10, color: theme.textColor}}
				/>
			</TouchableOpacity>
		</Fragment>
	);
};
