import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {
  quranPic,
  backBtn,
  favIcon,
  favSelectIcon,
} from '../../constants/images';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../../context/favouriteVerseContext';
import {SurahContext, SurahContextType} from '../../context/surahContext';

type Props = {
  surahTitle: any;
  navigation: any;
  surahVerseCount: any;
  styleOption?: any;
  fromSurah: boolean;
  onPress: any;
  surahIndex: number;
};
const HeaderDetail: FunctionComponent<Props> = props => {
  const {
    surahTitle,
    navigation,
    styleOption,
    surahVerseCount,
    fromSurah,
    onPress,
    surahIndex,
  } = props;
  const {checkSurahBookmarked} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;
  return (
    <View style={[styles.mainView, styleOption]}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backBtn} style={{borderColor: '#E9EEF0'}} />
        </TouchableOpacity>
        {fromSurah ? (
          <View style={styles.textView}>
            <Text style={styles.surahText}>Surah {surahTitle}</Text>
            <Text style={styles.countText}>{surahVerseCount} Verses</Text>
            <TouchableOpacity style={{top: 2}} onPress={onPress}>
              <Image
                source={
                  checkSurahBookmarked(surahIndex) ? favSelectIcon : favIcon
                }
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.textView}>
            <Text style={styles.surahText}>{surahTitle}</Text>
            <Text style={[styles.countText, {textAlign: 'right'}]}>
              {surahVerseCount}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: 'rgba(199,170,53,0.68)',
          opacity: 0.8,
        }}>
        <Image source={quranPic} style={{resizeMode: 'contain'}} />
      </View>
    </View>
  );
};
export default HeaderDetail;
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
    marginHorizontal: 22,
    paddingBottom: 16,
  },
  surahText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E9EEF0',
  },
  countText: {lineHeight: 32, fontSize: 16, color: '#FFFFFF'},
});
