import {omit} from 'lodash';
import {
  ADD_IMAGE_TO_REC_QUEUE,
  ADD_NEW_IMAGE_SEGMENT,
  CLEAR_REC_QUEUE,
  EDIT_IMAGE_SEGMENT,
  REMOVE_FROM_REC_QUEUE,
  REMOVE_IMAGE_SEGMENT,
  SET_LOADING,
  START_REC_QUEUE,
} from './recognizeActions';
import {ADD_IMAGE, DELETE_IMAGE} from '../image/imageActions';
import {ADD_NEW_EVENT} from '../events/eventActions';

/**
 * reducer for handling segments in images in existing events
 */
const initState = {
  loading: false,
  images: {},
  recognizeQueue: [],
};

const recognizeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case START_REC_QUEUE:
      return {
        ...state,
        // loading: true,
      };

    case ADD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.image.key]: {}
        }
      };

    case DELETE_IMAGE:
      return {
        ...state,
        images: omit(state.images, action.payload.imageKey),
      };

    case ADD_NEW_IMAGE_SEGMENT:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.imageKey]: {
            ...state.images[action.payload.imageKey],
            [action.payload.segment.key]: action.payload.segment,
          }
        }
      };

    case REMOVE_IMAGE_SEGMENT:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.imageKey]: omit(state.images[action.payload.imageKey], action.payload.segmentKey),
        }
      };

    case EDIT_IMAGE_SEGMENT:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.imageKey]: {
            ...state.images[action.payload.imageKey],
            [action.payload.segmentKey]: {
              ...state.images[action.payload.imageKey][action.payload.segmentKey],
              [action.payload.propKey]: action.payload.propValue,
            }
          }
        }
      };

    case ADD_NEW_EVENT:
      return {
        ...state,
        recognizeQueue: {
          ...state.recognizeQueue,
          [action.payload.key]: []
        }
      };

    case ADD_IMAGE_TO_REC_QUEUE:
      return {
        ...state,
        recognizeQueue: {
          ...state.recognizeQueue,
          [action.payload.eventKey]: [
            ...state.recognizeQueue[action.payload.eventKey],
            action.payload.imageKey
          ]
        }
      };

    case REMOVE_FROM_REC_QUEUE:
      const queue = state.recognizeQueue[action.payload.eventKey];
      const idx = queue.findIndex((key) => key === action.payload.imageKey);
      return {
        ...state,
        recognizeQueue: {
          ...state.recognizeQueue,
          [action.payload.eventKey]: [
            ...state.recognizeQueue[action.payload.eventKey].slice(0, idx),
            ...state.recognizeQueue[action.payload.eventKey].slice(idx + 1)
          ]
        }
      };

    case CLEAR_REC_QUEUE:
      return {
        ...state,
        recognizeQueue: {
          ...state.recognizeQueue,
          [action.payload]: []
        },
      };

    default:
      return state;
  }
};

export default recognizeReducer;
