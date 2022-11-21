import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: any;
  buttonStyle?: any;
};

const TextButton: React.FunctionComponent<ButtonProps> = props => {
  const {title, onPress, buttonStyle} = props;

  return (
    <View style={buttonStyle}>
      <Button title={title} onPress={onPress} color={'#00B4AC'} />
    </View>
  );
};

export default TextButton;
