import { HOST_SESSION_SUCCESS } from 'actions/types';

const initialState = {
  sessionId: '',
  players: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOST_SESSION_SUCCESS:
      return {
        ...state,
        sessionId: payload,
      };
    default:
      return state;
  }
}
