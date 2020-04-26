import Sockette from 'sockette';
import config from 'config';

import {
  SERVER_CONNECT_SUCCESS,
  HOST_SESSION_SUCCESS,
  HOST_SESSION_SEND,
} from 'actions/types';

const handleMessage = (data) => async (dispatch) => {
  const dataArr = data.split(';');
  console.log(dataArr[0]);
  if (dataArr[0].includes('host')) {
    const messageArr = dataArr.filter((val) => val.includes('message'));
    const value = messageArr[0].split(': ');
    console.log(value[1]);
    await dispatch(connectSession(value[1]));
  }
};

export const connectServer = () => async (dispatch) => {
  const ws = await new Sockette(config.socket.URL, {
    timeout: 5e3,
    maxAttempts: 1,
    onopen: (e) => console.log('connected:', e),
    onmessage: (e) => dispatch(handleMessage(e.data)),
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

export const connectSession = (sessionId) => async (dispatch) => {
  await dispatch({
    type: HOST_SESSION_SUCCESS,
    payload: sessionId,
  });
};
