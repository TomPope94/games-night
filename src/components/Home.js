import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Welcome to Station 10 Games Night!</h1>
      <h2>Please choose a game...</h2>
      <div onMouseDown={() => history.push('/codenames')}>
        <h1>Codenames</h1>
      </div>
      <div>
        <h1>Articulate</h1>
      </div>
      <div>
        <h1>5 Second Rule</h1>
      </div>
    </div>
  );
};

export default Home;
