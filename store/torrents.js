import * as delugeWebApi from "../utils/delugeWebApi";

const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE";
const REQUEST_BEGUN = "REQUEST_BEGUN";
const REQUEST_FAILURE = "REQUEST_FAILURE";
const GOT_TORRENTS = "GOT_TORRENTS";

const LOCAL_STORAGE_KEY = "deluge-web-api-pass";
let password;

const initialState = {
  isAuthenticated: !!password,
  isFetching: false,
  torrents: []
};

const requestFailed = (payload) => ({ type: REQUEST_FAILURE, payload });
const requestSuccess = (dispatch, type) => (payload) => dispatch({ type, payload });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BEGUN:
      return {
        ...state,
        isFetching: true
      };
    case GOT_TORRENTS:
      return {
        ...state,
        isFetching: false,
        torrents: action.payload.result.torrents
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

export function getTorrents() {
  return (dispatch) => {
    dispatch({ type: REQUEST_BEGUN });
    delugeWebApi
      .getTorrents()
      .then(requestSuccess(dispatch, GOT_TORRENTS))
      .catch(requestFailed);
  };
}

export function authenticate(pass = password) {
  return (dispatch, getState) => {
    const { torrents: { isAuthenticated } } = getState();
    return delugeWebApi
      .login(pass)
      .then(() => {
        password = pass;
        localStorage.setItem(LOCAL_STORAGE_KEY, password);
        if (!isAuthenticated) dispatch({ type: AUTHENTICATION_SUCCESS });
      })
      .catch(() => {
        password = undefined;
        localStorage.setItem(LOCAL_STORAGE_KEY, password);
        if (isAuthenticated) dispatch({ type: AUTHENTICATION_FAILURE });
      });
  };
}
