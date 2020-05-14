import {
  ARTICULATE_SEND_TEAM_SELECT,
  ARTICULATE_PLAYER_TEAM_SELECT,
  ARTICULATE_SEND_STATE_CHANGE,
  ARTICULATE_STATE_CHANGE_SUCCESS,
  ARTICULATE_SEND_MODE_CHANGE,
  ARTICULATE_MODE_CHANGE_SUCCESS,
  ARTICULATE_SEND_DATA_RESET,
  ARTICULATE_DATA_RESET_SUCCESS,
  ARTICULATE_SEND_NEXT_ROUND,
  ARTICULATE_NEXT_ROUND_SUCCESS,
  ARTICULATE_SEND_ROTA,
  ARTICULATE_ROTA_SUCCESS,
  ARTICULATE_SCORE_SEND,
  ARTICULATE_SCORE_SUCCESS,
  ARTICULATE_ROUND_START_SUCCESS,
  ARTICULATE_SEND_ROUND_START,
  ARTICULATE_SEND_SUMMARY,
  ARTICULATE_SUMMARY_SUCCESS,
  ARTICULATE_SEND_END_GAME,
  ARTICULATE_END_GAME_SUCCESS,
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
  } else if (dataArr[0].includes('_data_reset')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(refreshData(message));
  } else if (dataArr[0].includes('_next_round')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(moveToNextRound(message));
  } else if (dataArr[0].includes('_start_round')) {
    await dispatch(startRound());
  } else if (dataArr[0].includes('_score_update')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(roundScoreUpdate(message));
  } else if (dataArr[0].includes('_summary')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(toSummary(message));
  } else if (dataArr[0].includes('_end_game')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(endGame(message));
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

export const sendEndGame = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'articulateendgame',
    data: {
      sessionId: sessionId,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_END_GAME,
  });
};

export const endGame = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_END_GAME_SUCCESS,
    payload: data,
  });
};

export const sendRefreshData = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'articulatedatafetch',
    data: {
      sessionId: sessionId,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_DATA_RESET,
  });
};

export const refreshData = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_DATA_RESET_SUCCESS,
    payload: data,
  });
};

export const sendNextRound = (
  socket,
  sessionId,
  team,
  player,
  gameComplete
) => async (dispatch) => {
  // debugger;
  await socket.json({
    action: 'articulatenextround',
    data: {
      sessionId: sessionId,
      team: team,
      player: player,
      complete: gameComplete,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_NEXT_ROUND,
  });
};

export const moveToNextRound = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_NEXT_ROUND_SUCCESS,
    payload: data,
  });
};

export const addRota = (rota) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_ROTA_SUCCESS,
    payload: rota,
  });
};

export const sendStartRound = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'articulateroundstart',
    data: {
      sessionId: sessionId,
      roundStart: true,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_ROUND_START,
  });
};

export const startRound = () => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_ROUND_START_SUCCESS,
  });
};

export const sendRoundScoreUpdate = (
  socket,
  sessionId,
  newScore,
  words
) => async (dispatch) => {
  await socket.json({
    action: 'articulatescoreupdate',
    data: {
      sessionId: sessionId,
      score: newScore,
      words: words,
    },
  });

  await dispatch({
    type: ARTICULATE_SCORE_SEND,
  });
};

export const roundScoreUpdate = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_SCORE_SUCCESS,
    payload: data,
  });
};

export const sendToSummary = (
  socket,
  sessionId,
  passed,
  data,
  category
) => async (dispatch) => {
  await socket.json({
    action: 'articulatetosummary',
    data: {
      sessionId: sessionId,
      passed: passed,
      data: data,
      category: category,
    },
  });

  await dispatch({
    type: ARTICULATE_SEND_SUMMARY,
  });
};

export const toSummary = (data) => async (dispatch) => {
  await dispatch({
    type: ARTICULATE_SUMMARY_SUCCESS,
    payload: data,
  });
};
