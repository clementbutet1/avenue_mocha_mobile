import React, { useEffect } from 'react';
import { LogBox, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { configure } from 'mobx';

import AuthenStackScreen from './Navigation/AuthenStackScreen';
import { createStore, storeContext } from './Store/store';
import FooterStackScreen from './Navigation/FooterStackScreen';

LogBox.ignoreAllLogs();

const App = observer(() => {
  const store = useLocalObservable(createStore);

  return (
    <NavigationContainer>
      <storeContext.Provider value={store}>
        {store.token != null ? (
            <FooterStackScreen /> 
        ) : (  
          <AuthenStackScreen />
        )} 
      </storeContext.Provider>
    </NavigationContainer>
  );
});

export default App;
