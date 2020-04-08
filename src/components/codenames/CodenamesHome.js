import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import NewGameForm from 'components/codenames/NewGameForm';
import GridContainer from 'components/codenames/GridContainer';

import { HOME } from 'constants/routes';

const styles = {
  heroContainer: {
    width: '100%',
    height: 150,
    background: 'orange',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center ',
  },
};

const CodenamesHome = () => {
  const history = useHistory();

  const [firstPlayer, setFirstPlayer] = useState(null);

  return (
    <div>
      <p style={{ cursor: 'pointer' }} onMouseDown={() => history.push(HOME)}>
        Home
      </p>
      <div style={styles.heroContainer}>
        <h1>Codenames Generator</h1>
      </div>
      <NewGameForm setfirst={setFirstPlayer} />
      <GridContainer firstplayer={firstPlayer} />
    </div>
  );
};

export default CodenamesHome;
