import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {styles} from './index';
import {AppIcon} from '../../constants/images';
const LogoImage = () => {
  return (
    <View style={styles.container}>
      <Image source={AppIcon} />
    </View>
  );
};

export default LogoImage;
