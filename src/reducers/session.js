import {
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SEND,
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SEND,
  NEW_PLAYER_JOINED,
  PLAYER_LEFT,
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
    case PLAYER_LEFT:
      return {
        ...state,
        players: state.players.filter((player) => player.ID !== payload.ID),
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
