import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendChangeUsername } from 'actions/server';

const Username = ({ server, sendChangeUsername }) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(server.username);
  }, [server.username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendChangeUsername(server.wsConnection, state);
  };

  return (
    <div style={{ marginRight: 50 }}>
      <input
        type="text"
        value={state}
        style={{ fontSize: '1.5rem', padding: 10 }}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => handleSubmit(e)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps, { sendChangeUsername })(Username);
