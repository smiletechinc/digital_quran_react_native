import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {styles} from './index';
import {AppImageHeaderIcon} from '../../constants/images';
const AppImageHeader = () => {
  return (
    <View style={styles.AppImageHeaderContainer}>
      <Image source={AppImageHeaderIcon} />
    </View>
  );
};

export default AppImageHeader;
