import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { sendChatMessage } from 'actions/user';

const styles = {
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
  },
  textInput: {
    fontSize: '1.25rem',
    width: '100%',
    padding: 15,
    paddingRight: 100,
    borderRadius: 5,
  },
  button: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
    cursor: 'pointer',
    marginLeft: 10,
    borderRadius: '0 5px 5px 0',
    background: '#d9145c',
    padding: 10,
    color: '#fff',
    fontSize: '1.2rem',
    border: 'none',
  },
};

const MessageForm = ({ server, session, sendChatMessage, focus, setfocus }) => {
  const [message, setMessage] = useState('');
  // const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendChatMessage(server.wsConnection, session.sessionId, message);
    // inputRef.classList.remove('active');
    // setfocus(false);
    setMessage('');
  };

  return (
    <form style={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
      <input
        style={styles.textInput}
        type="text"
        value={message}
        // ref={inputRef}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setfocus(true)}
        onBlur={() => setfocus(false)}
      />
      <input type="submit" style={styles.button} value="Send."></input>
    </form>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendChatMessage })(MessageForm);
