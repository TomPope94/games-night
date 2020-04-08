import React from 'react';
import { useHistory } from 'react-router-dom';

import { HOME } from 'constants/routes';

const FiveSecondsHome = () => {
  const history = useHistory();

  return (
    <div>
      <p style={{ cursor: 'pointer' }} onMouseDown={() => history.push(HOME)}>
        Home
      </p>
      <h1>Five seconds home goes here</h1>
    </div>
  );
};

export default FiveSecondsHome;
