/**
 * define actions for setting the "base" image so camera or camera roll one
 */
export const SET_IMAGE = 'SET_IMAGE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export function setImage(image) {
	return {type: SET_IMAGE, payload: image};
}

export function addImageToEvent(key, image) {
	return {type: ADD_IMAGE, payload: {key, image}};
}

export function deleteImage(eventKey, imageKey) {
	return {type: DELETE_IMAGE, payload: {eventKey, imageKey}};
}
