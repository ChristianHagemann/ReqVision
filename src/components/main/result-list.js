import React, {Fragment} from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons/index';

import Button from '../basics/button';
import Text from '../basics/text';
import ResultContainer from '../result-container';
import SharingOptions from '../sharing-options';
import {useResults} from '../../store/results/hooks/useResults';
import {useTheme} from '../../store/settings/hooks/useTheme';
import {useSelectedIssue} from '../../store/sharing/hooks/useSelectedIssue';
import {useSendMail} from '../../store/sharing/hooks/useSendMail';
import {useSharingApi} from '../../store/sharing/hooks/useSharingApi';
import {useSharingOptions} from '../../store/sharing/hooks/useSharingOptions';
import {SHARING_STRINGS} from '../../utils/consts';
import style from '../../utils/styles';


/**
 * component that holds list of all results (text or image) to share
 * main component in result view
 */
export default function ResultList() {
	const {t} = useTranslation();

	const [theme] = useTheme();
	const {results} = useResults();
	const {platform, operation, email} = useSharingOptions();
	const {selectedIssue} = useSelectedIssue();
	const {startSharing, sharingLoading} = useSharingApi();
	const {openMailClient} = useSendMail();

	const recLoading = useSelector((state) => state.recognize.loading);
	const queueSize = useSelector((state) => state.sharing.sharingQueue.length);

	const height = Dimensions.get('window').height;

	const KeyboardScroll =
		Platform.OS === 'ios' ? KeyboardAwareScrollView : Fragment;

	/**
	 * start sharing all elements in sharing queue
	 */
	function onSharingPressed() {
		if (platform.value === SHARING_STRINGS.EMAIL) {
			openMailClient();
		} else {
			startSharing();
		}
	}

	return (
		<KeyboardScroll>
			<View
				style={[
					!recLoading && results.length === 0 ? '' : style.resultList,
					{height: height},
				]}>
				{!recLoading && results.length === 0 && (
					<View style={style.noResult}>
						<Text style={style.smallMarginBottom} size={20}>
							{t('PLACEHOLDER_NO_CURRENT_RESULT')}
						</Text>
					</View>
				)}
				{recLoading && (
					<View style={styles.loading}>
						<ActivityIndicator
							animating={true}
							size="large"
							color={theme.secondaryColor}
						/>
					</View>
				)}
				{!recLoading && (
					<Fragment>
						<SharingOptions />
						<View style={styles.multiSharingContainer}>
							<Button
								text={t('SHARE_ALL_SELECTED')}
								icon={faShareAlt}
								onPress={onSharingPressed}
								disabled={
									queueSize < 1 ||
									!platform ||
									(platform.value === SHARING_STRINGS.EMAIL && !email) ||
									(platform.value !== SHARING_STRINGS.EMAIL && !operation) ||
									(operation &&
										operation.value === SHARING_STRINGS.COMMENT &&
										!selectedIssue)
								}
								loading={sharingLoading}
								width="100%"
							/>
						</View>
						<ScrollView style={[styles.scrollView, {height: height * 0.9}]}>
							{results.length > 0 &&
								results.map(function(result, index) {
									return (
										<ResultContainer
											key={index}
											result={result}
											index={index}
										/>
									);
								})}
						</ScrollView>
					</Fragment>
				)}
			</View>
		</KeyboardScroll>
	);
}

const styles = StyleSheet.create({
	resultList: {
		paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 100,
		minHeight: '94%',
		width: '100%',
	},
	scrollView: {
		paddingTop: 10,
		marginBottom: 70,
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
	},
	multiSharingContainer: {
		padding: 5,
		position: 'relative',
		width: '100%',
		// bottom: 65,
		height: 50,
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
	},
});
