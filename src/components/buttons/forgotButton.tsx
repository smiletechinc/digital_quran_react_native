import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: any;
};

const TextButton: React.FunctionComponent<ButtonProps> = props => {
  const {title, onPress} = props;

  return <Button title={title} onPress={onPress} color={'#00B4AC'} />;
};

export default TextButton;
