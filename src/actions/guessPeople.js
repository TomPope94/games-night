import {
  GUESSPEOPLE_PLAYER_TEAM_SELECT,
  GUESSPEOPLE_SEND_STATE_CHANGE,
  GUESSPEOPLE_SEND_TEAM_SELECT,
  GUESSPEOPLE_STATE_CHANGE_SUCCESS,
  GUESSPEOPLE_END_GAME_SUCCESS,
  GUESSPEOPLE_SEND_END_GAME,
  GUESSPEOPLE_NAMES,
  GUESSPEOPLE_SEND_NAMES,
} from 'actions/types';

import { extractMessage } from 'actions/server';

export const handleGuessPeopleMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_team_join')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleTeamSelect(message));
  } else if (dataArr[0].includes('_state_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(changeState(message));
  } else if (dataArr[0].includes('_end_game')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(endGame(message));
  } else if (dataArr[0].includes('_names')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(names(message));
  }
};

export const sendTeamSelect = (socket, teamSelected, sessionId) => async (
  dispatch
) => {
  await socket.json({
    action: 'guesspeopleteamselect',
    data: {
      sessionId: sessionId,
      teamSelected: teamSelected,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_TEAM_SELECT,
  });
};

export const handleTeamSelect = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_PLAYER_TEAM_SELECT,
    payload: data,
  });
};

export const sendStateChange = (socket, sessionId, state) => async (
  dispatch
) => {
  await socket.json({
    action: 'guesspeoplestatechange',
    data: {
      sessionId: sessionId,
      state: state,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_STATE_CHANGE,
  });
};

export const changeState = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_STATE_CHANGE_SUCCESS,
    payload: data,
  });
};

export const sendEndGame = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'guesspeopleendgame',
    data: {
      sessionId: sessionId,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_END_GAME,
  });
};

export const endGame = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_END_GAME_SUCCESS,
    payload: data,
  });
};

export const sendNames = (socket, sessionId, names) => async (dispatch) => {
  await socket.json({
    action: 'guesspeoplenames',
    data: {
      sessionId,
      names,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_NAMES,
  });
};

export const names = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_NAMES,
    payload: data,
  });
};
