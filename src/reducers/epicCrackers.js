import {
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SUCCESS,
  CRACKER_ROUND_START,
  CRACKER_STATE_CHANGE,
  CRACKER_END_GAME,
  CRACKER_PLAYER_CHANGE,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: false,
  gameRound: -1,
  roundStarted: false,
  roundComplete: false,
  gameState: 'setup',
  yourTurn: false,
  gameQuestion: '',
  gameOptions: [],
  players: [],
  matchups: [],
  pastMatchups: [],
  gameData: [],
  introPlayed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        ...payload.GameData.Crackers,
      };
    case CRACKER_PLAYER_CHANGE:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case CRACKER_END_GAME:
      return {
        ...initialState,
        ...payload.Data.Crackers,
      };
    case CRACKER_STATE_CHANGE:
      return {
        ...initialState,
        ...payload.gameData.Crackers,
      };
    default:
      return state;
  }
}
