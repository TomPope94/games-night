import {
  GUESSPEOPLE_PLAYER_TEAM_SELECT,
  GUESSPEOPLE_SEND_STATE_CHANGE,
  GUESSPEOPLE_SEND_TEAM_SELECT,
  GUESSPEOPLE_STATE_CHANGE_SUCCESS,
  GUESSPEOPLE_END_GAME_SUCCESS,
  GUESSPEOPLE_SEND_END_GAME,
  GUESSPEOPLE_NAMES,
  GUESSPEOPLE_SEND_NAMES,
  GUESSPEOPLE_SEND_NEXT_ROUND,
  GUESSPEOPLE_NEXT_ROUND_SUCCESS,
  GUESSPEOPLE_ROTA_SUCCESS,
  GUESSPEOPLE_ROUND_START_SUCCESS,
  GUESSPEOPLE_SEND_ROUND_START,
  GUESSPEOPLE_SCORE_SEND,
  GUESSPEOPLE_SCORE_SUCCESS,
  GUESSPEOPLE_SEND_SUMMARY,
  GUESSPEOPLE_SUMMARY_SUCCESS,
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

export const sendNextRound = (socket, sessionId, team, player) => async (
  dispatch
) => {
  // debugger;
  await socket.json({
    action: 'guesspeoplenextround',
    data: {
      sessionId: sessionId,
      team: team,
      player: player,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_NEXT_ROUND,
  });
};

export const moveToNextRound = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_NEXT_ROUND_SUCCESS,
    payload: data,
  });
};

export const addRota = (rota) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_ROTA_SUCCESS,
    payload: rota,
  });
};

export const sendStartRound = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'guesspeopleroundstart',
    data: {
      sessionId: sessionId,
      roundStart: true,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_ROUND_START,
  });
};

export const startRound = () => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_ROUND_START_SUCCESS,
  });
};

export const sendRoundScoreUpdate = (
  socket,
  sessionId,
  newScore,
  words
) => async (dispatch) => {
  await socket.json({
    action: 'guesspeoplescoreupdate',
    data: {
      sessionId: sessionId,
      score: newScore,
      words: words,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SCORE_SEND,
  });
};

export const roundScoreUpdate = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_SCORE_SUCCESS,
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
    action: 'guesspeopletosummary',
    data: {
      sessionId: sessionId,
      passed: passed,
      data: data,
      category: category,
    },
  });

  await dispatch({
    type: GUESSPEOPLE_SEND_SUMMARY,
  });
};

export const toSummary = (data) => async (dispatch) => {
  await dispatch({
    type: GUESSPEOPLE_SUMMARY_SUCCESS,
    payload: data,
  });
};
