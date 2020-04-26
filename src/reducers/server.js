import {
  SERVER_CONNECT_SUCCESS,
  SERVER_DISCONNECT_SUCCESS,
  HOST_SESSION_SEND,
  HOST_SESSION_SUCCESS,
} from 'actions/types';

const initialState = {
  onServer: false,
  inGame: false,
  sessionId: '',
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
        loading: false,
      };
    case HOST_SESSION_SEND:
      return {
        ...state,
        loading: true,
      };
    case HOST_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: payload,
        inGame: true,
      };
    default:
      return state;
  }
}
