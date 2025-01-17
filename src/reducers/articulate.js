import {
  PLAYER_LEFT,
  ARTICULATE_SEND_TEAM_SELECT,
  ARTICULATE_PLAYER_TEAM_SELECT,
  JOIN_SESSION_SUCCESS,
  ARTICULATE_STATE_CHANGE_SUCCESS,
  HOST_SESSION_SUCCESS,
  ARTICULATE_MODE_CHANGE_SUCCESS,
  ARTICULATE_DATA_RESET_SUCCESS,
  ARTICULATE_NEXT_ROUND_SUCCESS,
  ARTICULATE_ROTA_SUCCESS,
  ARTICULATE_ROUND_START_SUCCESS,
  ARTICULATE_SCORE_SUCCESS,
  ARTICULATE_SUMMARY_SUCCESS,
  ARTICULATE_END_GAME_SUCCESS,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: true,
  teamChosen: false,
  gameStarter: -1,
  gameRound: -1,
  roundScore: 0,
  roundComplete: false,
  roundStart: false,
  wordsPassed: [],
  wordsCorrect: [],
  gameMode: '',
  gameState: 'TeamSelect',
  teamTurn: 'Red',
  playerTurn: '',
  yourTurn: false,
  gameRota: ['Red', 'Blue', 'Orange', 'Green'],
  gameTeams: {
    Red: {
      Pos: 10,
      Players: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
      PlayersGone: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
      PlayersLeft: [],
    },
    Blue: {
      Pos: 5,
      Players: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
    },
    Orange: {
      Pos: 33,
      Players: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
    },
    Green: {
      Pos: 3,
      Players: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        { ID: 'TEST', Username: 'TEST' },
        { ID: 'TEST', Username: 'TEST' },
      ],
    },
  },
  gameData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        ...payload.GameData.Articulate,
      };
    case PLAYER_LEFT:
      return {
        ...state,
        ...payload.Data.gameData.Articulate,
      };
    case ARTICULATE_END_GAME_SUCCESS:
      return {
        ...initialState,
        ...payload.Data.Articulate,
      };
    case ARTICULATE_SEND_TEAM_SELECT:
      return {
        ...state,
        loading: true,
        teamChosen: true,
      };
    case ARTICULATE_PLAYER_TEAM_SELECT:
      return {
        ...state,
        loading: false,
        gameTeams: {
          ...state.gameTeams,
          [payload.Team]: {
            ...state.gameTeams[payload.Team],
            Players: [
              ...state.gameTeams[payload.Team].Players,
              { ID: payload.ID, Username: payload.Username },
            ],
            PlayersLeft: [
              ...state.gameTeams[payload.Team].PlayersLeft,
              { ID: payload.ID, Username: payload.Username },
            ],
          },
        },
      };
    case ARTICULATE_STATE_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload.gameData.Articulate,
        gameStarted: true,
      };
    case ARTICULATE_MODE_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        gameMode: payload.mode,
      };
    case ARTICULATE_DATA_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        gameData: payload.gameData.Articulate.gameData,
      };
    case ARTICULATE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        gameState: payload.gameState,
        teamTurn: payload.team,
        playerTurn: payload.player,
        yourTurn: payload.yourTurn,
      };
    case ARTICULATE_ROTA_SUCCESS:
      return {
        ...state,
        loading: false,
        gameRota: payload,
      };
    case ARTICULATE_ROUND_START_SUCCESS:
      return {
        ...state,
        loading: false,
        roundStart: true,
      };
    case ARTICULATE_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        roundScore: payload.score,
        wordsCorrect: payload.words,
      };
    case ARTICULATE_SUMMARY_SUCCESS:
      return {
        ...state,
        ...payload.data.Articulate,
        loading: false,
      };
    default:
      return state;
  }
}
