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
} from 'actions/types';
import { extractMessage } from 'actions/server';

export const handleFivesecondsMessage = (dataArr) => async (dispatch) => {};

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

export const endGame = () => async (dispatch) => {
  await dispatch({
    type: FIVESECONDS_END_GAME,
  });
};
