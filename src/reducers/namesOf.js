import {
  NAMESOF_PLAYER_JOIN,
  NAMESOF_SEND_PLAYER_JOIN,
  NAMESOF_END_GAME,
  NAMESOF_ROUND_START,
  NAMESOF_STATE_CHANGE,
  NAMESOF_VERDICT,
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SUCCESS,
} from 'actions/types';

const initialState = {
  loading: false,
  gameRound: -1,
  roundStarted: false,
  roundComplete: false,
  gameMode: '',
  gameState: 'setup',
  playerTurn: {},
  master: {},
  yourTurn: false,
  inPool: false,
  players: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        ...payload.GameData.NamesOf,
      };
    case NAMESOF_SEND_PLAYER_JOIN:
      return {
        ...state,
        inPool: true,
      };
    case NAMESOF_PLAYER_JOIN:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case NAMESOF_STATE_CHANGE:
      return {
        ...state,
        yourTurn: payload.Master,
        ...payload.Data.NamesOf,
      };
    case NAMESOF_ROUND_START:
      return {
        ...state,
        roundStarted: true,
        ...payload.Data.NamesOf,
      };
    case NAMESOF_VERDICT:
      if (payload.pass) {
        return {
          ...state,
          ...payload.data.Data.NamesOf,
        };
      } else {
        return {
          ...state,
          ...payload.data.Data.NamesOf,
          yourTurn: payload.data.Master,
        };
      }
    case NAMESOF_END_GAME:
      return {
        ...initialState,
        ...payload.Data.NamesOf,
      };
    default:
      return state;
  }
}
