import React from 'react';
import { connect } from 'react-redux';
import Message from 'components/games/library/Message';

const Chat = ({ session }) => {
  const styles = {
    chatContainer: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 20,
      paddingBottom: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      height: '100%',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <div style={{ overflow: 'hidden', height: '90%' }}>
        <div style={{ height: '10%', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Session Feed:</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: '90%',
          }}
        >
          {session.messages.map((message) => (
            <Message user={message.Username} message={message.Message} />
          ))}
        </div>
      </div>
      <div style={{ height: '10%', width: '100%', display: 'flex' }}>
        <input
          style={{
            fontSize: '1.25rem',
            width: '80%',
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
          }}
          type="text"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            cursor: 'pointer',
            marginLeft: 10,
            borderRadius: 5,
            background: '#d9145c',
          }}
        >
          <h4>Send.</h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Chat);
