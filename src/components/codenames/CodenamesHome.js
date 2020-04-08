import React, { useState } from 'react';

import NewGameForm from 'components/codenames/NewGameForm';
import GridContainer from 'components/codenames/GridContainer';

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
  const [firstPlayer, setFirstPlayer] = useState(null);

  return (
    <div>
      <div style={styles.heroContainer}>
        <h1>Codenames Generator</h1>
      </div>
      <NewGameForm setfirst={setFirstPlayer} />
      <GridContainer firstplayer={firstPlayer} />
    </div>
  );
};

export default CodenamesHome;
