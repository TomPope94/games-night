import {
  ARTICULATE_SEND_TEAM_SELECT,
  ARTICULATE_PLAYER_TEAM_SELECT,
  ARTICULATE_SEND_STATE_CHANGE,
  ARTICULATE_STATE_CHANGE_SUCCESS,
  ARTICULATE_SEND_MODE_CHANGE,
  ARTICULATE_MODE_CHANGE_SUCCESS,
} from 'actions/types';
import { extractMessage } from 'actions/server';

export const handleArticulateMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_team_join')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(handleTeamSelect(message));
  } else if (dataArr[0].includes('_state_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(changeState(message));
  } else if (dataArr[0].includes('_mode_change')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(changeMode(message));
  }
};

export const sendTeamSelect = (socket, teamSelected, sessionId) => async (
  dispatch
) => {
  await socket.json({
    action: 'articulateteamselect',
    data: {
      sessionId: sessionId,
      teamSelected: teamSelected,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_TEAM_SELECT,
  });
};

export const handleTeamSelect = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_PLAYER_TEAM_SELECT,
    payload: data,
  });
};

export const sendStateChange = (socket, sessionId, state) => async (
  dispatch
) => {
  await socket.json({
    action: 'articulatestatechange',
    data: {
      sessionId: sessionId,
      state: state,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_STATE_CHANGE,
  });
};

export const changeState = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_STATE_CHANGE_SUCCESS,
    payload: data,
  });
};

export const sendModeChange = (socket, sessionId, mode) => async (dispatch) => {
  await socket.json({
    action: 'articulatemodechange',
    data: {
      sessionId: sessionId,
      mode: mode,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_MODE_CHANGE,
  });
};

export const changeMode = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_MODE_CHANGE_SUCCESS,
    payload: data,
  });
};
