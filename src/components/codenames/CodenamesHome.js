import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import NewGameForm from 'components/codenames/NewGameForm';
import GridContainer from 'components/codenames/GridContainer';

import HeroBanner from 'components/global/HeroBanner';

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

  const [refreshGame, setRefresh] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState(null);

  return (
    <div>
      <p style={{ cursor: 'pointer' }} onMouseDown={() => history.push(HOME)}>
        Home
      </p>
      <HeroBanner background="#da6026">
        <h1>Codenames Generator</h1>
      </HeroBanner>
      {!refreshGame ? (
        <button onMouseDown={() => setRefresh(true)}>Refresh Board</button>
      ) : (
        <NewGameForm setfirst={setFirstPlayer} changerefresh={setRefresh} />
      )}
      <GridContainer firstplayer={firstPlayer} />
    </div>
  );
};

export default CodenamesHome;
