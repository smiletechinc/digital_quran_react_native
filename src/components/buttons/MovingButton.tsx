import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {styles} from './index';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT} from '../../constants';

type PrimaryButtonProps = {
  title: string;
  onPress: any;
  isFavoriteCalled?: boolean;
  buttonMargin?: any;
  buttonMarginBottom?: any;
  gradientExtraProps?: any;
  isLoading?: boolean;
};
const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = props => {
  const {
    title,
    onPress,
    isFavoriteCalled,
    buttonMargin,
    buttonMarginBottom,
    gradientExtraProps,
    isLoading,
  } = props;
  var marginTopValue = buttonMargin ? buttonMargin : '90%';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.primaryButtonContainer,
        isFavoriteCalled ? {marginTop: '10%'} : {marginTop: buttonMargin},
        {marginBottom: buttonMarginBottom},
      ]}>
      <LinearGradient
        colors={['#00B4AC', '#007F79', '#006763']}
        locations={[0.0, 0.7, 0.9]}
        style={[
          gradientExtraProps ? gradientExtraProps : styles.linearGradientStyle,
          !isFavoriteCalled && {
            flex: 1,
          },
        ]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}>
        {isLoading ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '36%',
            }}>
            {isLoading && <ActivityIndicator size="small" color="yellow" />}
            <Text style={[styles.secondaryButtonText]}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.secondaryButtonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default PrimaryButton;
