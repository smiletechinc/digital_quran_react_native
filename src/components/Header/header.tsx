import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {backBtn} from '../../constants/images';

type Props = {
  text: string;
  hideProfileSection?: boolean;
  navigation: any;
  hideBackButton?: boolean;
};
const HeaderWithText: FunctionComponent<Props> = props => {
  const {text, navigation, hideBackButton} = props;

  return (
    <View style={styles.header_with_text_main_view}>
      {!hideBackButton && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{left: 16}}>
          <Image
            source={backBtn}
            style={{width: 32, height: 32, backgroundColor: '#1CB4AC'}}
          />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        <Text style={[styles.text]}>{text}</Text>
      </View>
    </View>
  );
};
export default HeaderWithText;
