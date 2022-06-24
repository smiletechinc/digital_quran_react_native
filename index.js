/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App.tsx';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store/store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

let persistor = persistStore(store);

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
