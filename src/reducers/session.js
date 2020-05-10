import {
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SEND,
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SEND,
  NEW_PLAYER_JOINED,
  PLAYER_LEFT,
  USER_CHAT_MESSAGE,
} from 'actions/types';

const initialState = {
  sessionId: '',
  players: [],
  loading: true,
  isHost: false,
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: payload.SessionID,
        players: payload.Players,
        messages: payload.Messages,
        isHost: true,
      };
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: payload.SessionID,
        players: payload.Players,
        messages: payload.Messages,
      };
    case NEW_PLAYER_JOINED:
      return {
        ...state,
        players: [...state.players, payload],
        messages: payload.Messages,
      };
    case PLAYER_LEFT:
      return {
        ...state,
        players: state.players.filter((player) => player.ID !== payload.ID),
        messages: payload.Data.messageList,
      };
    case HOST_SESSION_SEND:
    case JOIN_SESSION_SEND:
      return {
        ...state,
        loading: true,
      };
    case USER_CHAT_MESSAGE:
      return {
        ...state,
        messages: payload.Messages,
      };
    default:
      return state;
  }
}
