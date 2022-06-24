import * as React from 'react';
import { View, Text } from 'react-native';
import {styles} from './index';
import {LogoImage} from '../components/images/index';
import { LanguagePicker } from '../components/picker';

type Props = {
  navigation: any
}

const SettingScreen: React.FunctionComponent<Props> = (props) => {
  const {navigation} = props;
  
  const LogFunc = () => {
    navigation.replace('HomeScreen')
  }

  return (
     <View style={styles.selectionContainer}>
         <LogoImage />
         <Text>Setting Screen</Text>
    </View>
  );
}

export default SettingScreen;