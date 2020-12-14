import { combineReducers } from 'redux';
import server from 'reducers/server';
import session from 'reducers/session';
import articulate from 'reducers/articulate';
import fiveSeconds from 'reducers/fiveSeconds';
import guessPeople from 'reducers/guessPeople';
import namesOf from 'reducers/namesOf';
import epicCrackers from 'reducers/epicCrackers';
import alert from 'reducers/alert';

export default combineReducers({
  alert,
  server,
  session,
  articulate,
  fiveSeconds,
  guessPeople,
  namesOf,
  epicCrackers,
});
