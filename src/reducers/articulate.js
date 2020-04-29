import {
  ARTICULATE_SEND_TEAM_SELECT,
  ARTICULATE_PLAYER_TEAM_SELECT,
  JOIN_SESSION_SUCCESS,
  ARTICULATE_STATE_CHANGE_SUCCESS,
  HOST_SESSION_SUCCESS,
  ARTICULATE_MODE_CHANGE_SUCCESS,
  ARTICULATE_DATA_RESET_SUCCESS,
  ARTICULATE_NEXT_ROUND_SUCCESS,
  ARTICULATE_ROTA_SUCCESS,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: false,
  teamChosen: false,
  gameStarter: -1,
  gameRound: -1,
  gameMode: '',
  gameState: 'TeamSelect',
  teamTurn: '',
  playerTurn: '',
  yourTurn: false,
  gameRota: [],
  gameTeams: {
    Red: {
      Pos: 0,
      Players: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
    },
    Blue: {
      Pos: 0,
      Players: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
    },
    Orange: {
      Pos: 0,
      Players: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
      PlayersGone: [],
      PlayersLeft: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
    },
    Green: {
      Pos: 0,
      Players: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
      PlayersGone: [
        // { Username: 'Guest', ID: 'asgasgsa' },
        // { Username: 'Guest', ID: 'asgasgsa' },
      ],
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
        gameMode: payload.GameData.Articulate.gameMode,
        gameTeams: payload.GameData.Articulate.gameTeams,
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
        gameState: payload.state,
        gameStarter: payload.starterIndex,
        gameRound: payload.gameRound,
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
    default:
      return state;
  }
}
