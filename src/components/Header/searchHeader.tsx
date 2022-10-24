import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: any;
  styleOption?: any;
  selectedImage: any;
};
const SearchHeaderDetail: FunctionComponent<Props> = props => {
  const {t} = useTranslation();
  const {navigation, styleOption, selectedImage} = props;

  return (
    <View
      style={{
        backgroundColor: 'rgba(199,170,53,0.68)',
        opacity: 0.8,
        marginTop: -64,
      }}>
      <Image
        source={{uri: selectedImage}}
        style={{width: 'auto', height: 200}}
      />
    </View>
  );
};
export default SearchHeaderDetail;
