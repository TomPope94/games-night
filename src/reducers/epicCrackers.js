import {
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SUCCESS,
  CRACKER_ROUND_START,
  CRACKER_STATE_CHANGE,
  CRACKER_END_GAME,
  CRACKER_PLAYER_CHANGE,
  CRACKER_SEND_PLAYER_CHANGE,
  CRACKER_FINISH_INTRO,
} from "actions/types";

const initialState = {
  loading: false,
  gameStarted: false,
  gameRound: -1,
  roundStarted: false,
  roundComplete: false,
  gameState: "BeginGame",
  yourTurn: false,
  gameQuestion: "",
  gameOptions: [],
  players: [],
  matchups: [],
  pastMatchups: [],
  gameData: [],
  introPlayed: false,
  inPool: false,
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
    case CRACKER_SEND_PLAYER_CHANGE:
      return {
        ...state,
        inPool: true,
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
    case CRACKER_FINISH_INTRO:
      return {
        ...state,
        introPlayed: true,
      };
    default:
      return state;
  }
}
