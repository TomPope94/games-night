import React from 'react';

export const wsContext = React.createContext({
  connection: null,
  setConnection: () => {},
});
