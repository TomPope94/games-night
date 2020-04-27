import { combineReducers } from 'redux';
import server from 'reducers/server';
import session from 'reducers/session';
import articulate from 'reducers/articulate';

export default combineReducers({
  server,
  session,
  articulate,
});
