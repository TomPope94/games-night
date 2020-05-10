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
  },
  textInput: {
    fontSize: '1.25rem',
    width: 200,
    padding: 15,
    borderRadius: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    minWidth: 50,
    cursor: 'pointer',
    marginLeft: 10,
    borderRadius: 5,
    background: '#d9145c',
    padding: 20,
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
