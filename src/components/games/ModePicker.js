import React, { useState } from 'react';

const ModePicker = ({ modename, active, hovereffect = true, ...props }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    modeContainer: {
      background: '#fff',
      minHeight: 200,
      flexGrow: 1,
      margin: 20,
      boxShadow: '0px 3px 5px rgba(1,1,1,0.5)',
      borderRadius: 10,
      cursor: 'pointer',
      transform: hover && hovereffect ? 'scale(1.015,1.015)' : 'scale(1,1)',
      transition: '0.1s linear',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
      border: active ? '2px solid #d66e31' : 'none',
      ...props.styling,
    },
  };

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={styles.modeContainer}
      {...props}
    >
      <h2>{modename}</h2>
      {props.children}
    </div>
  );
};

export default ModePicker;
