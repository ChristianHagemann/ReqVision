import {SET_RESULT_ELEMENT, EDIT_RESULT_STATUS, EDIT_RESULT_TEXT} from './resultActions';
import {ADD_NEW_EVENT} from '../events/eventActions';

/**
 * reducer to manipulate result state
 * one result: {type: IMAGE | TEXT, text: string | null, source: string, description: string}
 */
const initState = {
  events: {},
};

const resultReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NEW_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.key]: {}
        }
      };

    case SET_RESULT_ELEMENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.eventKey]: {
            ...state.events[action.payload.eventKey],
            [action.payload.resultKey]: action.payload.result
          }
        },
      };

    case EDIT_RESULT_TEXT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.eventKey]: {
            ...state.events[action.payload.eventKey],
            [action.payload.resultKey]: {
              ...state.events[action.payload.eventKey][action.payload.resultKey],
              text: action.payload.text
            }
          }
        }
      };

    case EDIT_RESULT_STATUS:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.eventKey]: {
            ...state.events[action.payload.eventKey],
            [action.payload.resultKey]: {
              ...state.events[action.payload.eventKey][action.payload.resultKey],
              status: action.payload.status
            }
          }
        }
      };

    default:
      return state;
  }
};

export default resultReducer;
