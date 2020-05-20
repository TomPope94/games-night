import {
  NAMESOF_SEND_PLAYER_JOIN,
  NAMESOF_PLAYER_JOIN,
  NAMESOF_SEND_STATE_CHANGE,
  NAMESOF_STATE_CHANGE,
  NAMESOF_SEND_END_GAME,
  NAMESOF_END_GAME,
  NAMESOF_SEND_ROUND_START,
  NAMESOF_ROUND_START,
  NAMESOF_SEND_VERDICT,
  NAMESOF_VERDICT,
} from 'actions/types';

import { extractMessage } from 'actions/server';

export const handleNamesOfMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_join')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handlePlayerJoin(message));
  } else if (dataArr[0].includes('_end_game')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(endGame(message));
  } else if (dataArr[0].includes('_state_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleStateChange(message));
  } else if (dataArr[0].includes('_start_round')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(startRound(message));
  } else if (dataArr[0].includes('_pass')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleVerdict({ message, pass: true }));
  } else if (dataArr[0].includes('_fail')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleVerdict({ message, pass: false }));
  }
};

export const sendPlayerJoin = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'namesofplayerjoin',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: NAMESOF_SEND_PLAYER_JOIN,
  });
};

export const handlePlayerJoin = (data) => async (dispatch) => {
  await dispatch({
    type: NAMESOF_PLAYER_JOIN,
    payload: data,
  });
};

export const sendStateChange = (socket, sessionId, state) => async (
  dispatch
) => {
  await socket.json({
    action: 'namesofstatechange',
    data: {
      sessionId,
      state,
    },
  });

  await dispatch({
    type: NAMESOF_SEND_STATE_CHANGE,
  });
};

export const handleStateChange = (data) => async (dispatch) => {
  await dispatch({
    type: NAMESOF_STATE_CHANGE,
    payload: data,
  });
};

export const sendEndGame = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'namesofendgame',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: NAMESOF_SEND_END_GAME,
  });
};

export const endGame = (data) => async (dispatch) => {
  await dispatch({
    type: NAMESOF_END_GAME,
    payload: data,
  });
};

export const sendStartRound = (socket, sessionId, playerTurn) => async (
  dispatch
) => {
  await socket.json({
    action: 'namesofstartround',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: NAMESOF_SEND_ROUND_START,
  });
};

export const startRound = (data) => async (dispatch) => {
  await dispatch({
    type: NAMESOF_ROUND_START,
    payload: data,
  });
};

export const sendVerdict = (socket, sessionId, verdict) => async (dispatch) => {
  await socket.json({
    action: 'namesofverdict',
    data: {
      sessionId,
      verdict,
    },
  });

  await dispatch({
    type: NAMESOF_SEND_VERDICT,
  });
};

export const handleVerdict = (data) => async (dispatch) => {
  await dispatch({
    type: NAMESOF_VERDICT,
    payload: {
      data: data.message,
      pass: data.pass,
    },
  });
};
