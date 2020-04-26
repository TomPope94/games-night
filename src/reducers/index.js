import { combineReducers } from 'redux';
import server from 'reducers/server';
import session from 'reducers/session';

export default combineReducers({
  server,
  session,
});
