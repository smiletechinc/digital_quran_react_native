import * as React from 'react';
import {View, Text} from 'react-native';
import RootNavigator from './src/navigation/RootNaivgator';
import {Card} from 'react-native-paper';
import LanguageContextProvider from './src/context/languageContext';
const App = () => {
  return (
    <LanguageContextProvider>
      <RootNavigator />
    </LanguageContextProvider>
  );
};

export default App;
