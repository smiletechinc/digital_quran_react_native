import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {styles} from './index';
import LinearGradient from 'react-native-linear-gradient';

type PrimaryButtonProps = {
  title: string;
  onPress: any;
  isFavoriteCalled?: boolean;
};
const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = props => {
  const {title, onPress, isFavoriteCalled} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.primaryButtonContainer,
        isFavoriteCalled ? {marginTop: '10%'} : {marginTop: '90%'},
      ]}>
      <LinearGradient
        colors={['#00B4AC', '#007F79', '#006763']}
        locations={[0.0, 0.7, 0.9]}
        style={[
          styles.linearGradientStyle,
          !isFavoriteCalled && {
            flex: 1,
          },
        ]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}>
        <Text style={styles.secondaryButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
