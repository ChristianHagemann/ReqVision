/**
 * define actions and functions associated with the image and it's recognized text
 */
// handling image segments in images
export const ADD_NEW_IMAGE_SEGMENT = 'ADD_NEW_IMAGE_SEGMENT';
export const REMOVE_IMAGE_SEGMENT = 'REMOVE_IMAGE_SEGMENT';
export const EDIT_IMAGE_SEGMENT = 'EDIT_IMAGE_SEGMENT';

// handling the queue of images to recognize
export const SET_LOADING = 'SET_LOADING';
export const ADD_IMAGE_TO_REC_QUEUE = 'ADD_IMAGE_TO_REC_QUEUE';
export const REMOVE_FROM_REC_QUEUE = 'REMOVE_FROM_REC_QUEUE';
export const CLEAR_REC_QUEUE = 'CLEAR_REC_QUEUE';

// segment actions
export function addNewImageSegment(imageKey, segment) {
  return { type: ADD_NEW_IMAGE_SEGMENT, payload: { imageKey, segment } };
}

export function removeImageSegment(imageKey, segmentKey) {
  return { type: REMOVE_IMAGE_SEGMENT, payload: { imageKey, segmentKey } };
}

export function editImageSegment(imageKey, segmentKey, propKey, propValue) {
  return { type: EDIT_IMAGE_SEGMENT, payload: { imageKey, segmentKey, propKey, propValue } };
}

// queue actions
export function setLoading(bool) {
  return { type: SET_LOADING, payload: bool }
}

export function addImageToRecQueue(eventKey, imageKey) {
  return { type: ADD_IMAGE_TO_REC_QUEUE, payload: { eventKey, imageKey } };
}

export function removeFromRecQueue(eventKey, imageKey) {
  return { type: REMOVE_FROM_REC_QUEUE, payload: { eventKey, imageKey } };
}

export function clearRecognitionQueue(eventKey) {
  return { type: CLEAR_REC_QUEUE, payload: eventKey }
}
