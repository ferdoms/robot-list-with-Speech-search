import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
  REQUEST_SPEECH_TO_TEXT_PENDING,
  REQUEST_SPEECH_TO_TEXT_SUCCESS,
  REQUEST_SPEECH_TO_TEXT_FAILED
} from "./constants";

const initialStateSearch = {
  searchField: ""
};

export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

const initialStateRobots = {
  isPenging: true,
  robots: [],
  error: ""
};

export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_ROBOTS_SUCCESS:
      return { ...state, robots: action.payload, isPending: false };
    case REQUEST_ROBOTS_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
const initialStateSpeech = {
  speechInput: ""
};

export const requestSpeechToText = (
  state = initialStateSpeech,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_SPEECH_TO_TEXT_PENDING:
      return { ...state, isPending: true };
    case REQUEST_SPEECH_TO_TEXT_SUCCESS:
      return { ...state, speechInput: action.payload, isPending: false };
    case REQUEST_SPEECH_TO_TEXT_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
