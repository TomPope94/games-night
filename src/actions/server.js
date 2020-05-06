import Sockette from 'sockette';
import config from 'config';

import {
  SERVER_CONNECT_SUCCESS,
  HOST_SESSION_SUCCESS,
  HOST_SESSION_SEND,
  SERVER_USERNAME_SEND,
  SERVER_USERNAME_SUCCESS,
  JOIN_SESSION_SEND,
  JOIN_SESSION_SUCCESS,
  NEW_PLAYER_JOINED,
  PLAYER_LEFT,
  PING,
  PONG,
} from 'actions/types';

import { setAlert } from 'actions/alert';
import { handleArticulateMessage } from 'actions/articulate';
import { handleFivesecondsMessage } from 'actions/fiveSeconds';
import { handleGuessPeopleMessage } from 'actions/guessPeople';

export const extractMessage = (data) => {
  // debugger;
  const messageDataStr = data.substring(9, data.length);
  const messageData = JSON.parse(messageDataStr);

  return messageData[0];
};

const handleMessage = (data) => async (dispatch) => {
  const dataArr = data.split(';');
  console.log(dataArr[0]);
  if (dataArr[0].includes('articulate')) {
    await dispatch(handleArticulateMessage(dataArr));
  } else if (dataArr[0].includes('fiveseconds')) {
    await dispatch(handleFivesecondsMessage(dataArr));
  } else if (dataArr[0].includes('guesspeople')) {
    await dispatch(handleGuessPeopleMessage(dataArr));
  } else if (dataArr[0].includes('host')) {
    const messageData = extractMessage(dataArr[1]);
    await dispatch(connectSession(messageData));
  } else if (dataArr[0].includes('username')) {
    const messageArr = dataArr.filter((val) => val.includes('message'));
    const value = messageArr[0].split(': ');

    await dispatch(changeUsername(value[1]));
  } else if (dataArr[0].includes('player_join')) {
    const messageData = extractMessage(dataArr[1]);
    await dispatch(newPlayerJoin(messageData));
  } else if (dataArr[0].includes('server_join')) {
    const messageData = extractMessage(dataArr[1]);

    await dispatch(joinSession(messageData));
  } else if (dataArr[0].includes('player_left')) {
    const messageData = extractMessage(dataArr[1]);
    await dispatch(playerLeft(messageData));
  } else if (dataArr[0].includes('pong')) {
    await dispatch(pong());
  }
};

export const connectServer = () => async (dispatch) => {
  const ws = await new Sockette(config.socket.URL, {
    timeout: 1000,
    maxAttempts: 5,
    onopen: (e) => console.log('connected:', e),
    onmessage: (e) => {
      console.log('message: ', e);
      dispatch(handleMessage(e.data));
    },
    onmaximum: (e) => {
      console.log('max reached: ', e);
    },
  });

  // debugger;
  await dispatch({
    type: SERVER_CONNECT_SUCCESS,
    payload: ws,
  });
};

export const ping = (socket) => async (dispatch) => {
  await socket.json({
    action: 'ping',
  });

  await dispatch({
    type: PING,
  });
};

export const pong = () => async (dispatch) => {
  await dispatch({
    type: PONG,
  });
};

export const hostSession = (socket) => async (dispatch) => {
  await socket.json({
    action: 'hostserver',
  });
  await dispatch({
    type: HOST_SESSION_SEND,
  });
};

export const connectSession = (sessionData) => async (dispatch) => {
  await dispatch(setAlert('Welcome to the game!', 'positive'));

  await dispatch({
    type: HOST_SESSION_SUCCESS,
    payload: sessionData,
  });
};

export const sendJoinSession = (socket, sessionId) => async (dispatch) => {
  await socket.json({
    action: 'joinsession',
    data: sessionId,
  });

  await dispatch({
    type: JOIN_SESSION_SEND,
  });
};

export const joinSession = (newPlayer) => async (dispatch) => {
  await dispatch(setAlert('Welcome to the game!', 'positive'));

  await dispatch({
    type: JOIN_SESSION_SUCCESS,
    payload: newPlayer,
  });
};

export const newPlayerJoin = (newPlayer) => async (dispatch) => {
  await dispatch(
    setAlert(`${newPlayer.Username} has joined the game!`, 'positive')
  );

  await dispatch({
    type: NEW_PLAYER_JOINED,
    payload: newPlayer,
  });
};

export const playerLeft = (playerDetails) => async (dispatch) => {
  await dispatch(
    setAlert(`${playerDetails.Username} has left the game`, 'neutral')
  );

  await dispatch({
    type: PLAYER_LEFT,
    payload: playerDetails,
  });
};

export const sendChangeUsername = (socket, username) => async (dispatch) => {
  await socket.json({
    action: 'username',
    data: username,
  });

  await dispatch({
    type: SERVER_USERNAME_SEND,
  });
};

export const changeUsername = (username) => async (dispatch) => {
  // await dispatch(setAlert('Username changed', 'positive'));

  await dispatch({
    type: SERVER_USERNAME_SUCCESS,
    payload: username,
  });
};
