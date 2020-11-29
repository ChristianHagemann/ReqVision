/**
 * actions handling results in form of image or text
 */
export const GET_RESULT_TEXT = 'GET_RESULT_TEXT';
export const SET_RESULT_ELEMENT = 'SET_RESULT_ELEMENT';
export const EDIT_RESULT_TEXT = 'EDIT_RESULT_TEXT';
export const EDIT_RESULT_STATUS = 'EDIT_RESULT_STATUS';

export function getResultText(apiKey, resultLocation, image) {
  return { type: GET_RESULT_TEXT, payload: { apiKey, resultLocation, image } };
}

export function setResultElement(eventKey, resultKey, result) {
  return { type: SET_RESULT_ELEMENT, payload: { eventKey, resultKey, result } };
}

export function editResultText(eventKey, resultKey, text) {
  return { type: EDIT_RESULT_TEXT, payload: { eventKey, resultKey, text } };
}

export function editResultStatus(eventKey, resultKey, status) {
  return { type: EDIT_RESULT_STATUS, payload: {eventKey, resultKey, status} };
}
