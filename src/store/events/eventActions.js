/**
 * define actions for adding and editing projects
 */
export const ADD_NEW_EVENT = 'ADD_NEW_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
export const SET_DETAILS_VIEW = 'SET_DETAILS_VIEW';

export function addNewEvent(key, event) {
	return {type: ADD_NEW_EVENT, payload: {key, event}};
}
// TODO future work use integrate somewhere
export function editEvent(key, event) {
	return {type: EDIT_EVENT, payload: {key, event}};
}

export function deleteEvent(key) {
	return {type: DELETE_EVENT, payload: key};
}

export function setActiveEvent(key) {
	return {type: SET_ACTIVE_EVENT, payload: key};
}

export function setDetailsView(bool) {
	return {type: SET_DETAILS_VIEW, payload: bool};
}
