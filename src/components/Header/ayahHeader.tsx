import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {quranPic, backBtn} from '../../constants/images';

type Props = {
  surahTitle: any;
  navigation: any;
};

const AyahHeader: FunctionComponent<Props> = props => {
  const {surahTitle, navigation} = props;

  return (
    <View style={[styles.mainView]}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backBtn} style={{borderColor: '#E9EEF0'}} />
        </TouchableOpacity>
        <View style={[styles.textView, {marginBottom: 12}]}>
          <Text style={styles.surahText}>{surahTitle}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(199,170,53,0.68)',
          opacity: 1,
          left: '47%',
        }}>
        <Image source={quranPic} style={{resizeMode: 'contain'}} />
      </View>
    </View>
  );
};
export default AyahHeader;
const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#C7AA35',
  },
  textView: {
    alignItems: 'center',
    paddingBottom: 18,
    paddingLeft: 16,
    paddingTop: 16,
  },
  surahText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E9EEF0',
  },
});
