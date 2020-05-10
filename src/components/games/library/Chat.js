import React from 'react';
import { connect } from 'react-redux';
import Message from 'components/games/library/Message';
import MessageForm from 'components/games/library/MessageForm';

const Chat = ({ session, mobile, setfocus, focus }) => {
  const styles = {
    chatContainer: {
      paddingLeft: mobile ? 0 : 40,
      paddingRight: mobile ? 0 : 40,
      paddingTop: mobile ? 0 : 20,
      paddingBottom: mobile ? 100 : 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      height: '100%',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <div
        style={{
          overflow: 'hidden',
          height: '90%',
          display: mobile && focus ? 'none' : 'block',
        }}
      >
        <div style={{ height: '10%', display: 'flex', alignItems: 'center' }}>
          {mobile ? null : <h2 style={{ margin: 0 }}>Session Feed:</h2>}
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
      <MessageForm focus={focus} setfocus={setfocus} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Chat);
