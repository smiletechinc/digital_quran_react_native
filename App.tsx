import * as React from 'react';
import {View, Text} from 'react-native';
import RootNavigator from './src/navigation/RootNaivgator';
import {Card} from 'react-native-paper';
import {
  LanguageContextProvider,
  SurahContextProvider,
} from './src/context/index';
const App = () => {
  return (
    <LanguageContextProvider>
      <SurahContextProvider>
        <RootNavigator />
      </SurahContextProvider>
    </LanguageContextProvider>
  );
};

export default App;
