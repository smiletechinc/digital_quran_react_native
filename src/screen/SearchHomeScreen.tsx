import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {styles} from './index';
import {LogoImage} from '../components/images/index';
import { LanguagePicker } from '../components/picker';

type Props = {
  navigation: any
}

const SearchingScreen: React.FunctionComponent<Props> = (props) => {
  const {navigation} = props;
  

  const LogFunc = () => {
    navigation.replace('HomeScreen')
  }

  return (
     <View style={styles.selectionContainer}>
         <LogoImage />
         <Text> Searching Screen </Text>
    </View>
  );
}

export default SearchingScreen;