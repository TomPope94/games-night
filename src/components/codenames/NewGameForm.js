import React from 'react';
import GameButton from 'components/global/GameButton';

const styles = {
  colorChoiceContainer: {
    display: 'flex',
  },
};

const NewGameForm = ({ setfirst, changerefresh }) => {
  const handleClick = (team) => {
    setfirst(team);
    changerefresh(false);
  };

  return (
    <div>
      <p>Which Team Goes First?</p>
      <div style={styles.colorChoiceContainer}>
        <GameButton
          background='#F20732'
          onMouseDown={() => handleClick('red')}
        />
        <GameButton
          background='#0439D9'
          onMouseDown={() => handleClick('blue')}
        />
      </div>
    </div>
  );
};

export default NewGameForm;
