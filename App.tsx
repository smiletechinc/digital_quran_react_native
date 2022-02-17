import * as React from 'react'; 
import { View, Text } from 'react-native';
import RootNavigator from './src/navigation/RootNaivgator';
import { Card } from 'react-native-paper';

const App = () => {
  return(
    <RootNavigator />
  );
}

export default App;