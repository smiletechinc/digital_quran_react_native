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
  const [headerWidth, setHeaderWidth] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const onLayout = (event: any) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    console.log('Dimensions : ', x, y, height, width);
    setHeaderWidth(width);
    setHeaderHeight(height);
  };

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
