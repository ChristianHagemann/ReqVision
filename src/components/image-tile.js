import React from 'react';
import {
	ImageBackground,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

import {useImageSelectedForRecognition} from '../store/recognize/hooks/useImageSelectedForRecognition';
import {useTheme} from '../store/settings/hooks/useTheme';

/**
 * square image tile component
 * press to edit, press and hold to add image and segments to queue
 */
export default function ImageTile(props) {
	const [theme] = useTheme();
	const {isSelected} = useImageSelectedForRecognition();

	const selected = isSelected(props.image.key);

	return (
		<View
			style={[
				styles.tile,
				{borderColor: theme.borderColor, backgroundColor: theme.touchableColor},
			]}>
			<TouchableWithoutFeedback
				onLongPress={() => props.onTileLongPressed(props.image)}
				onPress={() => props.onTilePressed(props.image, selected)}>
				<View style={styles.opacity}>
					<ImageBackground
						resizeMode="cover"
						source={{uri: props.image.source}}
						style={styles.image}>
						{selected && (
							<FontAwesomeIcon
								icon={faCheck}
								size={24}
								style={{color: 'green'}}
							/>
						)}
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	tile: {
		display: 'flex',
		borderWidth: 1,
		borderStyle: 'solid',
		width: '33.333%',
	},
	opacity: {
		height: 120,
		width: '100%',
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -1,
	},
});
