// import {NativeModules} from 'react-native';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';

import {
	COMPUTER_VISION,
	HTTPS,
	RESULT_STATUS,
	TYPES,
	RESP_SUCCEEDED,
} from '../../../utils/consts';
import {useMicrosoftSettings} from '../../settings/hooks/useMicrosoftSettings';
import {useRecognizeQueue} from './useRecognizeQueue';
import {useFindImageFromKey} from './useFindImageFromKey';
import {clearRecognitionQueue, setLoading} from '../recognizeActions';
import {useActiveEvent} from '../../events/hooks/useActiveEvent';
import {useSetResultElement} from '../../results/hooks/useSetResultElement';
import {useNotification} from '../../../utils/hooks/useNotification';
import {useFormatResultText} from '../../../utils/hooks/useFormatResultText';

// const ImageProcessingModule = NativeModules.ImageProcessing;

/**
 *
 */
export const useRecognitionApi = () => {
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const {activeEventKey} = useActiveEvent();
	const {findImage} = useFindImageFromKey();
	const {showError} = useNotification();
	const {formatText} = useFormatResultText();

	const {microsoftEndpoint, microsoftKey} = useMicrosoftSettings();

	const preProcessing = useSelector(
		(state) => state.settings.global.preProcessing,
	);
	let {recognizeQueue} = useRecognizeQueue();
	const setResult = useSetResultElement();

	const MAX_FETCH_TRIES = Platform.OS === 'ios' ? 17 : 10;

	const recognizeInstance = axios.create({
		timeout: 5000,
		headers: {
			'Content-Type': 'application-json',
		},
	});

	function startQueue(key) {
		dispatch(setLoading(true));
		const recognitionKey = recognizeQueue[0];
		const element = findImage(key ? key : recognitionKey);

		const recURL = HTTPS + microsoftEndpoint + COMPUTER_VISION;

		if (element !== null) {
			if (element.type === TYPES.IMAGE) {
				// image should stay image so just add to result queue and rec next element
				setResult(element.key, {
					key: element.key,
					type: TYPES.IMAGE,
					source: element.source,
					status: RESULT_STATUS.SUCCESS_RESULT,
				});
				recNextQueueElement();
			} else {
				// image should be analyzed so do resize, pre-processing and recognition

				if (element.width > 2000 || element.height > 2000) {
					ImageResizer.createResizedImage(
						element.source,
						2000,
						2000,
						'JPEG',
						100,
						0,
						null,
					).then((response) => {
						recognizeImage(microsoftKey, recURL, {
							key: element.key,
							type: element.type ? element.type : TYPES.TEXT,
							title: element.title ? element.title : '',
							source:
								Platform.OS === 'ios'
									? response.uri.replace('file://', '')
									: response.uri,
							width: response.width,
							height: response.height,
							rectangle: element.rectangle,
						});
					});
				} else {
					recognizeImage(microsoftKey, recURL, {
						key: element.key,
						type: element.type ? element.type : TYPES.TEXT,
						title: element.title ? element.title : '',
						source:
							Platform.OS === 'ios'
								? element.source.replace('/private', '')
								: element.source,
						width: element.width,
						height: element.height,
						rectangle: element.rectangle,
					});
				}
				// if (preProcessing) {
				//   // start pre-processing if selected in settings
				//   ImageProcessingModule.preprocessImage(currentImageURI, (err) => {console.log(err)}, (success) => {
				//     if (success !== null) {
				//       recognizeImage(microsoftKey, recURL, {
				//         key: element.key,
				//         type: element.type,
				//         title: element.title,
				//         source: currentImageURI,
				//         width: currentWidth,
				//         height: currentHeight,
				//         rectangle: element.rectangle
				//       });
				//     } else { // error with pre-processing
				//       dispatch(addResultElement(element.key, {
				//         key: element.key,
				//         type: TYPES.TEXT,
				//         source: currentImageURI,
				//         title: element.title,
				//         text: null,
				//         status: RESULT_STATUS.PRE_PROCESSING_ERROR,
				//         width: currentWidth,
				//         height: currentHeight,
				//         rectangle: element.rectangle
				//       }));
				//       // dispatch(recNextQueueElement());
				//     }
				//   })
			}
		} else {
			recNextQueueElement();
		}
	}

	/**
	 *
	 */
	function recNextQueueElement() {
		recognizeQueue = recognizeQueue.slice(1);
		if (recognizeQueue.length > 0) {
			startQueue();
		} else {
			dispatch(clearRecognitionQueue(activeEventKey));
			dispatch(setLoading(false));
		}
	}

	/**
	 *
	 */
	function recognizeImage(apiKey, apiEndpoint, image) {
		let source = image.source;

		RNFetchBlob.fetch(
			'POST',
			apiEndpoint,
			{
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': apiKey,
			},
			RNFetchBlob.wrap(source),
		)
			.then(
				async (res) => {
					const header = res.respInfo.headers;
					if (
						header['Operation-Location'] &&
						header['Operation-Location'] !== undefined
					) {
						// result exists at result location
						await getResultText(apiKey, header['Operation-Location'], image);
					} else {
						showError(t('ERROR_RECOGNIZING_TEXT'));
						setResult(image.key, {
							key: image.key,
							type: TYPES.TEXT,
							source: image.source,
							text: null,
							status: RESULT_STATUS.RECOGNITION_ERROR,
						});
						recNextQueueElement();
					}
				},
				(reason) => {
					console.warn(reason);
					showError(t('ERROR_RECOGNIZING_TEXT'));
					setResult(image.key, {
						key: image.key,
						type: TYPES.TEXT,
						source: image.source,
						text: null,
						status: RESULT_STATUS.RECOGNITION_ERROR,
					});
					recNextQueueElement();
				},
			)
			.catch((error) => {
				console.warn(error);
				showError(t('ERROR_RECOGNIZING_TEXT'));
				setResult(image.key, {
					key: image.key,
					type: TYPES.TEXT,
					source: image.source,
					text: null,
					status: RESULT_STATUS.RECOGNITION_ERROR,
				});
				recNextQueueElement();
			});
	}

	/**
	 *
	 */
	async function getResultText(apiKey, resultLocation, image) {
		const img = image;
		let resultArray = [];
		let succeeded = false;
		let tries = 0;

		try {
			while (!succeeded && tries < MAX_FETCH_TRIES) {
				// try multiple times to get result and set array
				// store.dispatch(setStatus(STATUS_TRYING_REQUEST));
				recognizeInstance.defaults.headers.get[
					'Ocp-Apim-Subscription-Key'
				] = apiKey;
				recognizeInstance.defaults.timeout = 5000;
				const json = await recognizeInstance.get(resultLocation);
				if (
					json.data &&
					json.data.status === RESP_SUCCEEDED &&
					json.data.analyzeResult
				) {
					succeeded = true;
					resultArray = json.data.analyzeResult.readResults[0].lines;
				}
				setTimeout(function() {
					console.log('WAITING');
				}, 2000);
				tries += 1;
			}
		} catch (error) {
			console.warn(error);
			showError(t('ERROR_FETCHING_RESULT_TEXT'));
			setResult(img.key, {
				key: img.key,
				type: TYPES.TEXT,
				source: img.source,
				text: null,
				status: RESULT_STATUS.TEXT_FETCHING_ERROR,
			});
			recNextQueueElement();
		}

		if (succeeded && resultArray.length > 0) {
			// append array to get one text
			const resultText = formatText(resultArray);
			setResult(img.key, {
				key: img.key,
				type: TYPES.TEXT,
				source: img.source,
				text: resultText,
				status: RESULT_STATUS.SUCCESS_RESULT,
			});
			recNextQueueElement();
		} else {
			showError(t('ERROR_WITH_RESULT_TEXT'));
			setResult(img.key, {
				key: img.key,
				type: TYPES.TEXT,
				source: img.source,
				text: null,
				status: RESULT_STATUS.TEXT_FETCHING_ERROR,
			});
			recNextQueueElement();
		}
	}

	return {startQueue, recognizeImage, getResultText};
};
