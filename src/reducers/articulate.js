import {
  ARTICULATE_SEND_TEAM_SELECT,
  ARTICULATE_PLAYER_TEAM_SELECT,
  JOIN_SESSION_SUCCESS,
  ARTICULATE_STATE_CHANGE_SUCCESS,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: false,
  teamChosen: false,
  gameState: 'TeamSelect',
  gameTeams: {
    Red: {
      Pos: 1,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Blue: {
      Pos: 1,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Orange: {
      Pos: 1,
      Players: [],
      PlayersGone: [],
      PlayersLeft: [],
    },
    Green: {
      Pos: 1,
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
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
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
          },
        },
      };
    case ARTICULATE_STATE_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        gameState: payload.state,
      };
    default:
      return state;
  }
}
