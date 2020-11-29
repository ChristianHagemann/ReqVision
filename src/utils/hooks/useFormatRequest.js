/**
 * helper hook for string operations concerning the request URL and parameters
 */
export const useFormatRequest = () => {
	function setLineBreaks(string) {
		return string ? string.split('%0A').join('%0A%0A') : string;
	}

	function getFirstWord(string) {
		return string ? string.split('\n')[0].split(' ')[0] : string;
	}

	function setHtmlLineBreaks(string) {
		return string ? string.split('\n').join('<br>') : string;
	}

	return {setLineBreaks, getFirstWord, setHtmlLineBreaks};
};
