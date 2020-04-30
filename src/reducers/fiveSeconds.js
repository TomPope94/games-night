import {
  FIVESECONDS_PLAYER_JOIN,
  FIVESECONDS_LIVES_CHANGE,
  FIVESECONDS_DATA_RESET,
  FIVESECONDS_STATE_CHANGE,
  FIVESECONDS_END_GAME,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: false,
  numLives: 2,
  gameStarter: -1,
  gameRound: -1,
  roundRound: -1,
  roundComplete: false,
  roundStarted: false,
  roundRoundStarted: false,
  roundRoundComplete: false,
  voteStarted: false,
  voteCompleted: false,
  playerPassed: false,
  gameMode: '',
  gameState: 'setup',
  playerTurn: '',
  yourTurn: false,
  roundRota: [],
  players: [
    { ID: 'adgasdg', Username: 'Tom', lives: 2, voted: false },
    { ID: 'asdgasg', Username: 'Claudia', lives: 2, voted: false },
  ],
  gameData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIVESECONDS_PLAYER_JOIN:
      return {
        ...state,
        players: [...state.players, payload.data],
      };
    case FIVESECONDS_LIVES_CHANGE:
      return {
        ...state,
        numLives: payload.data,
      };
    case FIVESECONDS_DATA_RESET:
      return {
        ...state,
        loading: false,
        gameData: payload.gameData.FiveSeconds.gameData,
      };
    case FIVESECONDS_STATE_CHANGE:
      return {
        ...state,
        loading: false,
        ...payload.gameData.Articulate,
        gameStarted: true,
      };
    case FIVESECONDS_END_GAME:
      return {
        ...initialState,
        ...payload.Data.Articulate,
      };
    default:
      return state;
  }
}
