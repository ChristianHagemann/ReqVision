/**
 * helper hook that formats the result text recognized by and returned from microsoft
 * @param textArray array with the result text split by lines
 * @returns {string} formatted text
 */
export const useFormatResultText = () => {
	function formatText(textArray) {
		let currentText = '';

		for (let i = 0; i < textArray.length; i++) {
			const line = textArray[i];
			currentText =
				currentText + line.text + (i < textArray.length - 1 ? '\n' : '');
		}

		return currentText;
	}

	return {formatText};
};
