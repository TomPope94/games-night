import { USER_CHAT_MESSAGE, USER_SEND_CHAT_MESSAGE } from 'actions/types';
import { extractMessage } from 'actions/server';

export const handleUserMessage = (dataArr) => async (dispatch) => {
  if (dataArr[0].includes('_chat_message')) {
    const message = extractMessage(dataArr[1]);
    await dispatch(chatMessage(message));
  }
};

export const sendChatMessage = (socket, sessionId, message) => async (
  dispatch
) => {
  await socket.json({
    action: 'userchatmessage',
    data: {
      sessionId: sessionId,
      message: message,
    },
  });

  await dispatch({
    type: USER_SEND_CHAT_MESSAGE,
  });
};

export const chatMessage = (data) => async (dispatch) => {
  dispatch({
    type: USER_CHAT_MESSAGE,
    payload: data,
  });
};
