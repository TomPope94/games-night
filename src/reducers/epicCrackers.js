import {
  JOIN_SESSION_SUCCESS,
  HOST_SESSION_SUCCESS,
  CRACKER_ROUND_START,
  CRACKER_STATE_CHANGE,
  CRACKER_END_GAME,
  CRACKER_PLAYER_CHANGE,
  CRACKER_SEND_PLAYER_CHANGE,
  CRACKER_FINISH_INTRO,
  CRACKER_SHOW_QUESTION,
  CRACKERS_DATA_RESET,
} from "actions/types";

const initialState = {
  loading: false,
  gameStarted: false,
  roundNum: -1,
  roundStart: false,
  roundComplete: false,
  gameState: "setup",
  yourTurn: false,
  gameQuestion: {},
  players: [
    // {
    //   Username: "Guest",
    //   inPool: true,
    //   ID: "asdgsagasg",
    // },
    // {
    //   Username: "Guest2",
    //   inPool: true,
    //   ID: "asgasdgas",
    // },
  ],
  matchups: [
    // [
    //   {
    //     Username: "Guest",
    //     inPool: true,
    //     ID: "asdgsagasg",
    //   },
    //   {
    //     Username: "Guest2",
    //     inPool: true,
    //     ID: "asgasdgas",
    //   },
    // ],
  ],
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
    case CRACKER_ROUND_START:
      return {
        ...state,
        ...payload.Data.Crackers,
        yourTurn: payload.YourTurn,
      };
    case CRACKER_SHOW_QUESTION:
      return {
        ...state,
        gameQuestion: payload.GameQuestion,
      };
    case CRACKERS_DATA_RESET:
      return {
        ...state,
        gameData: payload,
      };
    default:
      return state;
  }
}
