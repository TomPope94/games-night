import React from 'react';

const Message = ({ user, message, ...props }) => {
  const styles = {
    messageContainer: {
      borderRadius: 5,
      background: user === '_Server_' ? '#d9145c' : '#fff',
      boxShadow: '0 3px 5px rgba(1,1,1,0.2)',
      marginBottom: 15,
      color: user === '_Server_' ? '#fff' : 'rgb(1,1,1)',
      paddingLeft: 15,
      paddingRight: 15,
    },
  };

  return (
    <div style={styles.messageContainer}>
      {user === '_Server_' ? (
        <p>{message}</p>
      ) : (
        <p>
          <span style={{ color: '#d9145c' }}>{user}</span>: {message}
        </p>
      )}
    </div>
  );
};

export default Message;
