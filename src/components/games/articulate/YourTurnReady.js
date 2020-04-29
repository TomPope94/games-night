import React from 'react';
import { connect } from 'react-redux';
import GameButton from 'components/global/GameButton';

import { sendStartRound, changeState } from 'actions/articulate';

const styles = {
  readyContainer: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    padding: 50,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const YourTurnReady = ({
  category,
  server,
  session,
  articulate,
  sendStartRound,
  ...props
}) => {
  const handleBegin = async () => {
    await sendStartRound(server.wsConnection, session.sessionId);
  };

  return (
    <div style={styles.readyContainer}>
      <h1>It's your turn!</h1>
      <h3>Your category is: {category}</h3>
      <p>
        You will have 1 minute to explain the word. You can say anything you
        like, as long as you don't say that word!
      </p>
      <p>Good luck {server.username}!</p>
      <GameButton color="#d66e31" onMouseDown={() => handleBegin()}>
        <h2>Begin.</h2>
      </GameButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  articulate: state.articulate,
});

export default connect(mapStateToProps, { sendStartRound })(YourTurnReady);
