import {
  SERVER_CONNECT_SUCCESS,
  SERVER_DISCONNECT_SUCCESS,
  HOST_SESSION_SEND,
  HOST_SESSION_SUCCESS,
  SERVER_USERNAME_SEND,
  SERVER_USERNAME_SUCCESS,
} from 'actions/types';

const initialState = {
  onServer: false,
  inGame: false,
  username: '',
  wsConnection: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SERVER_CONNECT_SUCCESS:
      return {
        ...state,
        wsConnection: { ...payload },
        onServer: true,
        username: 'Guest',
        loading: false,
      };
    case HOST_SESSION_SEND:
    case SERVER_USERNAME_SEND:
      return {
        ...state,
        loading: true,
      };
    case HOST_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        inGame: true,
      };
    case SERVER_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        username: payload,
      };
    default:
      return state;
  }
}
