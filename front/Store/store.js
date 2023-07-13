import React from 'react';
const moment = require('moment-timezone');

export const createStore = () => {
  const store = {
    user: null,
    token: null,
    filter: null,
  };
  return store;
};

export const storeContext = React.createContext(null);

export const useStore = () => {
  const store = React.useContext(storeContext);
  return store;
};
