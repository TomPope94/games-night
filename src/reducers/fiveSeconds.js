import {
  HOST_SESSION_SUCCESS,
  JOIN_SESSION_SUCCESS,
  FIVESECONDS_PLAYER_JOIN,
  FIVESECONDS_SEND_PLAYER_JOIN,
  FIVESECONDS_LIVES_CHANGE,
  FIVESECONDS_DATA_RESET,
  FIVESECONDS_STATE_CHANGE,
  FIVESECONDS_END_GAME,
  FIVESECONDS_QUESTION_END,
  FIVESECONDS_VOTE_SEND,
  FIVESECONDS_VOTE_RECEIVE,
  FIVESECONDS_ROUND_START,
  FIVESECONDS_RESULT,
} from 'actions/types';

const initialState = {
  loading: false,
  gameStarted: true,
  numLives: 2,
  gameStarter: -1,
  gameRound: -1,
  roundRound: -1,
  roundComplete: false,
  roundStarted: true,
  roundRoundStarted: true,
  roundRoundComplete: true,
  voteStarted: false,
  voteCompleted: false,
  playerPassed: false,
  inPool: false,
  gameMode: '',
  gameState: 'BeginGame',
  playerTurn: 'Tom',
  voted: false,
  yourTurn: false,
  pass: 0,
  fail: 0,
  roundRota: [],
  gameQuestion: '',
  players: [
    // {
    //   ID: 'adgasdg',
    //   Username: 'Tom',
    //   lives: 2,
    //   voted: false,
    //   completed: true,
    // },
    // {
    //   ID: 'adgasdg',
    //   Username: 'Tom',
    //   lives: 0,
    //   voted: false,
    //   completed: true,
    // },
    // {
    //   ID: 'adgasdg',
    //   Username: 'Tom',
    //   lives: 0,
    //   voted: false,
    //   completed: false,
    // },
    // {
    //   ID: 'asdgasg',
    //   Username: 'Claudia',
    //   lives: 2,
    //   voted: false,
    //   completed: false,
    // },
  ],
  gameData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        ...payload.GameData.FiveSeconds,
      };
    case FIVESECONDS_PLAYER_JOIN:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case FIVESECONDS_SEND_PLAYER_JOIN:
      return {
        ...state,
        inPool: true,
      };
    case FIVESECONDS_LIVES_CHANGE:
      return {
        ...state,
        numLives: payload.lives,
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
        ...payload.gameData.FiveSeconds,
        gameStarted: true,
      };
    case FIVESECONDS_END_GAME:
      return {
        ...initialState,
        ...payload.Data.FiveSeconds,
      };
    case FIVESECONDS_ROUND_START:
      return {
        ...state,
        roundStarted: true,
        roundRoundStarted: true,
        playerTurn: payload.nextPlayer,
        gameQuestion: payload.gameQuestion,
      };
    case FIVESECONDS_QUESTION_END:
      return {
        ...state,
        roundRoundComplete: true,
      };
    case FIVESECONDS_VOTE_SEND:
      return {
        ...state,
        voted: true,
      };
    case FIVESECONDS_VOTE_RECEIVE:
      return {
        ...state,
        pass: payload.passes,
        fail: payload.fails,
      };
    case FIVESECONDS_RESULT:
      return {
        ...state,
        players: [
          ...state.players.filter(
            (player) => player.ID !== state.playerTurn.ID
          ),
          {
            ...state.playerTurn,
            completed: true,
            lives: payload.result
              ? state.playerTurn.lives
              : state.playerTurn.lives - 1,
          },
        ],
      };
    default:
      return state;
  }
}
