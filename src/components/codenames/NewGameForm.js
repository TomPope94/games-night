import React from 'react';

const NewGameForm = ({ setfirst, changerefresh }) => {
  const handleClick = (team) => {
    setfirst(team);
    changerefresh(false);
  };

  return (
    <div>
      <p>Which Team Goes First?</p>
      <button onMouseDown={() => handleClick('red')}>Red</button>
      <button onMouseDown={() => handleClick('blue')}>Blue</button>
    </div>
  );
};

export default NewGameForm;
