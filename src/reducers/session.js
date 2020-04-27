import {
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SEND,
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SEND,
  NEW_PLAYER_JOINED,
} from 'actions/types';

const initialState = {
  sessionId: '',
  players: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: payload.SessionID,
        players: payload.Players,
      };
    case NEW_PLAYER_JOINED:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case HOST_SESSION_SEND:
    case JOIN_SESSION_SEND:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
