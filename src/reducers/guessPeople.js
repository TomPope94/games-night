import {
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SUCCESS,
  GUESSPEOPLE_END_GAME_SUCCESS,
  GUESSPEOPLE_SEND_TEAM_SELECT,
  GUESSPEOPLE_PLAYER_TEAM_SELECT,
  GUESSPEOPLE_STATE_CHANGE_SUCCESS,
  GUESSPEOPLE_NAMES,
  GUESSPEOPLE_SEND_NAMES,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: false,
  teamChosen: false,
  gameStarter: -1,
  gameRound: -1,
  submittedPeople: false,
  completedSubmits: false,
  roundScore: 0,
  roundComplete: false,
  roundStart: false,
  wordsPassed: [],
  wordsCorrect: [],
  gameMode: '',
  gameState: 'peopleInput',
  teamTurn: '',
  playerTurn: '',
  yourTurn: false,
  gameRota: [],
  gameTeams: {
    Red: {
      Pos: 0,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Blue: {
      Pos: 0,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Orange: {
      Pos: 0,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Green: {
      Pos: 0,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
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
        ...payload.GameData.GuessPeople,
      };
    case GUESSPEOPLE_END_GAME_SUCCESS:
      return {
        ...initialState,
        ...payload.Data.GuessPeople,
      };
    case GUESSPEOPLE_SEND_TEAM_SELECT:
      return {
        ...state,
        loading: true,
        teamChosen: true,
      };
    case GUESSPEOPLE_PLAYER_TEAM_SELECT:
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
    case GUESSPEOPLE_STATE_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload.gameData.GuessPeople,
        gameStarted: true,
      };
    case GUESSPEOPLE_SEND_NAMES:
      return {
        ...state,
        submittedPeople: true,
      };
    case GUESSPEOPLE_NAMES:
      return {
        ...state,
        gameData: [...payload.names],
        completedSubmits: payload.submitsComplete,
      };
    default:
      return state;
  }
}