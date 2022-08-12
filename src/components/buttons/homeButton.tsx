import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

type SecondaryButtonProps = {
  title: string;
  onPress?: any;
};
const SecondaryButton: React.FunctionComponent<
  SecondaryButtonProps
> = props => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity style={styles.buttonView}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonView: {
    width: '70%',
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '90%',
    borderColor: '#00B4AC',
    borderWidth: 1,
  },
  buttonText: {
    color: '#1CB4AC',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 14,
    textAlign: 'center',
  },
});
