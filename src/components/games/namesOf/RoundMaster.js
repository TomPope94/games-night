import React from 'react';
import { connect } from 'react-redux';

import { sendStartRound } from 'actions/namesOf';

import GameButton from 'components/global/GameButton';

const RoundMaster = ({ server, session, namesOf, sendStartRound }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <h2>
        It is <span style={{ color: '#d95a11' }}>your turn</span> as master of
        the round!
      </h2>
      <h3>How to be master:</h3>
      <ol>
        <li>Announce a category to the group.</li>
        <li>Click the begin button.</li>
        <li>Pass or Fail people based on their answers!</li>
      </ol>
      <GameButton
        background="#d95a11"
        color="#fff"
        onMouseDown={async () =>
          await sendStartRound(server.wsConnection, session.sessionId)
        }
      >
        <h3>Begin.</h3>
      </GameButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps, { sendStartRound })(RoundMaster);
