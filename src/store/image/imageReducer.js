import {omit} from 'lodash';

import {ADD_IMAGE, DELETE_IMAGE, SET_IMAGE} from './imageActions';
import {ADD_NEW_EVENT, DELETE_EVENT, SET_ACTIVE_EVENT} from '../events/eventActions';

const initState = {
  image: null,
  events: {}
};

/**
 * reducer for the original image from the camera or camera roll
 */
const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    case ADD_NEW_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.key]: {}
        }
      };

    case DELETE_EVENT:
      return {
        ...state,
        image: null
      };

    case SET_ACTIVE_EVENT:
      return {
        ...state,
        image: null,
      };

    case ADD_IMAGE:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.key]: {
            ...state.events[action.payload.key],
            [action.payload.image.key]: action.payload.image
          }
        }
      };

    case DELETE_IMAGE:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.eventKey]: omit(state.events[action.payload.eventKey], action.payload.imageKey)
        }
      };

    default:
      return state;
  }
};

export default imageReducer;
