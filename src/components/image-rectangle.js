import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {useRemoveImageSegment} from '../store/recognize/hooks/useRemoveImageSegment';
import {useTheme} from '../store/settings/hooks/useTheme';
import {TYPES} from '../utils/consts';

/**
 * component to highlight selected areas on the original image with colored rectangles
 */
export default function ImageRectangle(props) {

	const [theme] = useTheme();
	const {removeSegment} = useRemoveImageSegment();

	let height = Math.floor(
		(props.segment.rectangle.height * (Dimensions.get('window').height * 0.9)) /
			props.original.height,
	);
	let width = Math.floor(
		(props.segment.rectangle.width * Dimensions.get('window').width) /
			props.original.width,
	);
	let top = Math.floor(
		(props.segment.rectangle.y * 96) / props.original.height,
	);
	let left = Math.floor(
		(props.segment.rectangle.x * 100) / props.original.width,
	);
	const borderColor =
		props.segment.type === TYPES.IMAGE ? theme.blue : theme.red;

	// if (Platform.OS === 'ios') { // TODO positioning not totally on point (untertrieben)
	//   width = left > 35 ? Math.floor(width * 0.9) : Math.floor(width * 0.85);
	//   height = top <= 35 ? Math.floor(height * 0.8) : Math.floor(height * 0.9);
	//   top = top <= 35 ? top + 4 : top;
	//   left = left > 35 ? left + 2.5 : left + 1;
	// }

	/**
	 * remove the cropped segment and thus the rectangle is no longer displayed
	 */
	function removeRectangle() {
		removeSegment(props.segment);
	}

	return (
		<View
			style={{
				height: height,
				width: width,
				top: top + '%',
				left: left + '%',
				marginTop: 15,
				borderRadius: 3,
				borderColor: borderColor,
				borderWidth: 2,
				position: 'absolute',
				zIndex: 99,
			}}>
			<TouchableOpacity
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 30,
					width: 30,
					borderRadius: 15,
					position: 'absolute',
					top: -15,
					left: -15,
					backgroundColor: borderColor,
					zIndex: 10,
				}}
				onPress={removeRectangle}>
				<FontAwesomeIcon icon={faTimes} size={12} style={{color: 'white'}} />
			</TouchableOpacity>
		</View>
	);
}
