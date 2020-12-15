import {
  CRACKER_END_GAME,
  CRACKER_PLAYER_CHANGE,
  CRACKER_SEND_END_GAME,
  CRACKER_SEND_PLAYER_CHANGE,
  CRACKER_SEND_STATE_CHANGE,
  CRACKER_STATE_CHANGE,
  CRACKER_ROUND_START,
  CRACKER_SEND_ROUND_START,
} from 'actions/types';

import { extractMessage } from 'actions/server';

export const handleCrackerMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_join')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handlePlayerChange(message));
  } else if (dataArr[0].includes('_end_game')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(endGame(message));
  } else if (dataArr[0].includes('_state_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleStateChange(message));
  }
};

export const sendPlayerChange = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'crackersplayerchange',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: CRACKER_SEND_PLAYER_CHANGE,
  });
};

export const handlePlayerChange = (data) => async (dispatch) => {
  await dispatch({
    type: CRACKER_PLAYER_CHANGE,
    payload: data,
  });
};

export const sendStateChange = (socket, sessionId, state) => async (
  dispatch
) => {
  await socket.json({
    action: 'crackersstatechange',
    data: {
      sessionId,
      state,
    },
  });

  await dispatch({
    type: CRACKER_SEND_STATE_CHANGE,
  });
};

export const handleStateChange = (data) => async (dispatch) => {
  await dispatch({
    type: CRACKER_STATE_CHANGE,
    payload: data,
  });
};

export const sendEndGame = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'crackersendgame',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: CRACKER_SEND_END_GAME,
  });
};

export const endGame = (data) => async (dispatch) => {
  await dispatch({
    type: CRACKER_END_GAME,
    payload: data,
  });
};

export const sendStartRound = (socket, sessionId, playerTurn) => async (
  dispatch
) => {
  await socket.json({
    action: 'crackersstartround',
    data: {
      sessionId,
    },
  });

  await dispatch({
    type: CRACKER_SEND_ROUND_START,
  });
};

export const startRound = (data) => async (dispatch) => {
  await dispatch({
    type: CRACKER_ROUND_START,
    payload: data,
  });
};
