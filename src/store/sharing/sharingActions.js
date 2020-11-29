/**
 * define actions associated with sharing the result text(s) online
 */
export const SET_LOADING = 'SET_LOADING';
export const ADD_TO_SHARING_QUEUE = 'ADD_TO_SHARING_QUEUE';
export const REMOVE_FROM_SHARING_QUEUE = 'REMOVE_FROM_SHARING_QUEUE';

export const SET_SHARING_PLATFORM = 'SET_SHARING_PLATFORM';
export const SET_SHARING_OPERATION = 'SET_SHARING_OPERATION';
export const SET_SHARING_ISSUES = 'SET_SHARING_ISSUES';
export const SET_SELECTED_ISSUE = 'SET_SELECTED_ISSUE';
export const CLEAR_ISSUES = 'CLEAR_ISSUES';
export const SET_SHARING_MAIL = 'SET_SHARING_MAIL';
export const CLEAR_SHARING_OPTIONS = 'CLEAR_SHARING_OPTIONS';

export function setLoading(bool) {
	return {type: SET_LOADING, payload: bool};
}

export function addToSharingQueue(key) {
	return {type: ADD_TO_SHARING_QUEUE, payload: key};
}

export function removeFromSharingQueue(key) {
	return {type: REMOVE_FROM_SHARING_QUEUE, payload: key};
}

export function setSharingPlatform(platform) {
	return {type: SET_SHARING_PLATFORM, payload: platform};
}

export function setSharingOperation(operation) {
	return {type: SET_SHARING_OPERATION, payload: operation};
}

export function setIssues(issues) {
	return {type: SET_SHARING_ISSUES, payload: issues};
}

export function setSelectedIssue(issue) {
	return {type: SET_SELECTED_ISSUE, payload: issue};
}

export function clearIssues() {
	return {type: CLEAR_ISSUES};
}

export function setSharingMail(mail) {
	return {type: SET_SHARING_MAIL, payload: mail};
}

export function clearSharingOptions() {
	return {type: CLEAR_SHARING_OPTIONS};
}
