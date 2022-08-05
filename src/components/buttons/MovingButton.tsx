import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {styles} from './index';
import LinearGradient from 'react-native-linear-gradient';

type PrimaryButtonProps = {
  title: string;
  onPress: any;
};
const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = props => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.primaryButtonContainer}>
      <LinearGradient
        colors={['#00B4AC', '#007F79', '#006763']}
        locations={[0.0, 0.7, 0.9]}
        style={[
          {
            flex: 1,
            padding: 12,
            // paddingTop: 18,
            // height: 50,
            borderRadius: 10,
            alignItems: 'center',
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
