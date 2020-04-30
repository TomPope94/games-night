import {
  FIVESECONDS_SEND_PLAYER_JOIN,
  FIVESECONDS_PLAYER_JOIN,
  FIVESECONDS_SEND_LIVES_CHANGE,
  FIVESECONDS_LIVES_CHANGE,
  FIVESECONDS_SEND_DATA_RESET,
  FIVESECONDS_DATA_RESET,
  FIVESECONDS_SEND_STATE_CHANGE,
  FIVESECONDS_STATE_CHANGE,
  FIVESECONDS_SEND_END_GAME,
  FIVESECONDS_END_GAME,
  FIVESECONDS_ROUND_START,
  ARTICULATE_SEND_ROUND_START,
  FIVESECONDS_SEND_QUESTION_END,
  FIVESECONDS_QUESTION_END,
  FIVESECONDS_VOTE_SEND,
  FIVESECONDS_VOTE_RECEIVE,
  FIVESECONDS_RESULT_SEND,
  FIVESECONDS_RESULT,
} from 'actions/types';
import { extractMessage } from 'actions/server';

export const handleFivesecondsMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_join')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(playerJoin(message));
  } else if (dataArr[0].includes('_lives_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(livesChange(message));
  } else if (dataArr[0].includes('_data_reset')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(dataReset(message));
  } else if (dataArr[0].includes('_end_game')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(endGame(message));
  } else if (dataArr[0].includes('_state_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(stateChange(message));
  } else if (dataArr[0].includes('_start_round')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(startRound(message));
  } else if (dataArr[0].includes('_end_question')) {
    await dispatch(endQuestion());
  } else if (dataArr[0].includes('_vote')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(receiveVote(message));
  } else if (dataArr[0].includes('_result')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(result(message));
  }
};

export const sendPlayerJoin = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondsplayerjoin',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_PLAYER_JOIN,
  });
};

export const playerJoin = (data) => async (dispatch) => {
  // debugger;
  await dispatch({
    type: FIVESECONDS_PLAYER_JOIN,
    payload: data,
  });
};

export const sendLivesChange = (socket, sessionId, lives) => async (
  dispatch
) => {
  await socket.json({
    action: 'fivesecondsliveschange',
    data: {
      sessionId,
      lives,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_LIVES_CHANGE,
  });
};

export const livesChange = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_LIVES_CHANGE,
    payload: data,
  });
};

export const sendDataReset = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondsdatareset',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_DATA_RESET,
  });
};

export const dataReset = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_DATA_RESET,
    payload: data,
  });
};

export const sendStateChange = (socket, sessionId, state) => async (
  dispatch
) => {
  await socket.json({
    action: 'fivesecondsstatechange',
    data: {
      sessionId,
      state,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_STATE_CHANGE,
  });
};

export const stateChange = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_STATE_CHANGE,
    payload: data,
  });
};

export const sendEndGame = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondsendgame',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_END_GAME,
  });
};

export const endGame = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_END_GAME,
    payload: data,
  });
};

export const sendStartRound = (
  socket,
  sessionId,
  nextPlayer,
  gameQuestion
) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondstartround',
    data: {
      sessionId,
      nextPlayer,
      gameQuestion,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_ROUND_START,
  });
};

export const startRound = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_ROUND_START,
    payload: data,
  });
};

export const sendEndQuestion = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondendquestion',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: FIVESECONDS_SEND_QUESTION_END,
  });
};

export const endQuestion = () => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_QUESTION_END,
  });
};

export const sendVote = (socket, sessionId, vote) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondvote',
    data: {
      sessionId,
      vote,
    },
  });

  await dispatch({
    type: FIVESECONDS_VOTE_SEND,
  });
};

export const receiveVote = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_VOTE_RECEIVE,
    payload: data,
  });
};

export const sendResult = (socket, sessionId, result) => async (dispatch) => {
  await socket.json({
    action: 'fivesecondresult',
    data: {
      sessionId,
      result,
    },
  });

  await dispatch({
    type: FIVESECONDS_RESULT_SEND,
  });
};

export const result = (data) => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_RESULT,
    payload: data,
  });
};
