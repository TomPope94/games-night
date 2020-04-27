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
} from 'actions/types';

import { handleArticulateMessage } from 'actions/articulate';

export const extractMessage = (data) => {
  const messageDataStr = data.substring(9, data.length);
  const messageData = JSON.parse(messageDataStr);

  return messageData[0];
};

const handleMessage = (data) => async (dispatch) => {
  const dataArr = data.split(';');
  console.log(dataArr[0]);
  if (dataArr[0].includes('host')) {
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
  } else if (dataArr[0].includes('articulate')) {
    await dispatch(handleArticulateMessage(dataArr));
  }
};

export const connectServer = () => async (dispatch) => {
  const ws = await new Sockette(config.socket.URL, {
    timeout: 5e3,
    maxAttempts: 1,
    onopen: (e) => console.log('connected:', e),
    onmessage: (e) => {
      console.log('message: ', e);
      dispatch(handleMessage(e.data));
    },
  });

  // debugger;
  await dispatch({
    type: SERVER_CONNECT_SUCCESS,
    payload: ws,
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
  await dispatch({
    type: JOIN_SESSION_SUCCESS,
    payload: newPlayer,
  });
};

export const newPlayerJoin = (newPlayer) => async (dispatch) => {
  await dispatch({
    type: NEW_PLAYER_JOINED,
    payload: newPlayer,
  });
};

export const playerLeft = (playerDetails) => async (dispatch) => {
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
  await dispatch({
    type: SERVER_USERNAME_SUCCESS,
    payload: username,
  });
};
