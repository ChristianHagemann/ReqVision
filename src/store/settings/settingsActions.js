/**
 * define actions and functions for the settings view
 * some settings are global, others are event specific
 */
// global
export const SET_MICROSOFT_ENDPOINT = 'SET_MICROSOFT_ENDPOINT';
export const SET_MICROSOFT_KEY = 'SET_MICROSOFT_KEY';
export const SET_USE_PRE_PROCESSING = 'SET_USE_PRE_PROCESSING';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME_DARK = 'SET_THEME_DARK';
export const SET_THEME_LIGHT = 'SET_THEME_LIGHT';

// events
// asana
export const ADD_ASANA_SETTINGS = 'ADD_ASANA_SETTINGS';
export const SET_ASANA_TOKEN = 'SET_ASANA_TOKEN';
export const SET_ASANA_PROJECT_ID = 'SET_ASANA_PROJECT_ID';
// gitlab
export const ADD_GITLAB_SETTINGS = 'ADD_GITLAB_SETTINGS';
export const SET_GITLAB_TOKEN = 'SET_GITLAB_TOKEN';
export const SET_GITLAB_LOCATION = 'SET_GITLAB_LOCATION';
export const SET_GITLAB_PROJECT_ID = 'SET_GITLAB_PROJECT_ID';

/**
 * global settings
 */
export function setMicrosoftEndpoint(endpoint) {
	return {type: SET_MICROSOFT_ENDPOINT, payload: endpoint};
}

export function setMicrosoftKey(key) {
	return {type: SET_MICROSOFT_KEY, payload: key};
}

export function setUsePreProcessing(bool) {
	return {type: SET_USE_PRE_PROCESSING, payload: bool};
}

export function setLanguage(lang) {
	return {type: SET_LANGUAGE, payload: lang};
}

export function setThemeDark() {
	return {type: SET_THEME_DARK};
}

export function setThemeLight() {
	return {type: SET_THEME_LIGHT};
}

/**
 * project settings
 */
// Asana
export function addAsanaSettings(key) {
	return {type: ADD_ASANA_SETTINGS, payload: key};
}

export function setAsanaToken(key, token) {
	return {type: SET_ASANA_TOKEN, payload: {key, token}};
}

export function setAsanaProjectId(key, id) {
	return {type: SET_ASANA_PROJECT_ID, payload: {key, id}};
}

// GitLab
export function addGitlabSettings(key) {
	return {type: ADD_GITLAB_SETTINGS, payload: key};
}

export function setGitlabToken(key, token) {
	return {type: SET_GITLAB_TOKEN, payload: {key, token}};
}

export function setGitlabLocation(key, location) {
	return {type: SET_GITLAB_LOCATION, payload: {key, location}};
}

export function setGitlabProjectId(key, id) {
	return {type: SET_GITLAB_PROJECT_ID, payload: {key, id}};
}
