import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
  REQUEST_SPEECH_TO_TEXT_PENDING,
  REQUEST_SPEECH_TO_TEXT_SUCCESS,
  REQUEST_SPEECH_TO_TEXT_FAILED,
  SPEECH_ON,
  SPEECH_OFF,
} from "./constants";
import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});

export const requestSpeechToText = () => dispatch => {
  dispatch({ type: REQUEST_SPEECH_TO_TEXT_PENDING });
  dispatch({ type: SPEECH_ON });
  fetch(process.env.REACT_APP_DOMAIN + "api/speech-to-text/token")
    .then(response => {
      return response.text();
    })
    .then(token => {
      var stream = recognizeMic({
        access_token: token,
        objectMode: true, // send objects instead of text
        extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        format: false, // optional - performs basic formatting on the results such as capitals an periods
        url: "https://gateway-lon.watsonplatform.net/speech-to-text/api",
        keepMicrophone: true 
      });
      stream.on("data", data => {
        dispatch({
          type: REQUEST_SPEECH_TO_TEXT_SUCCESS,
          payload: data.alternatives[0].transcript
        });
      });
      stream.on("error", error => {
        dispatch({ type: REQUEST_SPEECH_TO_TEXT_FAILED, payload: error });
      });
      document.querySelector('#stop').onclick = stream.stop.bind(stream);
    })
    .catch(function(error) {
      dispatch({ type: REQUEST_SPEECH_TO_TEXT_FAILED, payload: error });
    });
};

export const requestRobots = () => dispatch => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }));
};

export const speechOff = () => ({
  type: SPEECH_OFF
});