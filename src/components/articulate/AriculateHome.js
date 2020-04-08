import React from 'react';
import { useHistory } from 'react-router-dom';

import { HOME } from 'constants/routes';

const ArticulateHome = () => {
  const history = useHistory();

  return (
    <div>
      <p style={{ cursor: 'pointer' }} onMouseDown={() => history.push(HOME)}>
        Home
      </p>
      <h1>ArticulateHome goes here!</h1>
    </div>
  );
};

export default ArticulateHome;
