import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {favIcon, favSelectIcon, selectionIcon} from '../../constants/images';

type Props = {
  onPress?: any;
  ayaObject: any;
  isSurah: boolean;
  onTouchEnd: any;
};

const BookmarkListItem: React.FunctionComponent<Props> = props => {
  const {onPress, onTouchEnd, ayaObject, isSurah} = props;
  const {t} = useTranslation();
  return isSurah ? (
    <View style={[styles.itemContainer]}>
      <TouchableOpacity style={{padding: 32}} onPress={onPress}>
        <Image source={favSelectIcon} />
      </TouchableOpacity>
      <View style={styles.textView} onTouchEnd={onTouchEnd}>
        <Text style={styles.ayatText}>{t(ayaObject.title)}</Text>
        <Text style={styles.ayatIndex}>{Number(t(ayaObject.index))}</Text>
      </View>
    </View>
  ) : (
    <View style={[styles.itemContainer]}>
      <TouchableOpacity style={{padding: 32}} onPress={onPress}>
        <Image source={favSelectIcon} />
      </TouchableOpacity>
      <Text style={styles.ayatText}>{ayaObject.ayatText}</Text>
      <Text style={styles.ayatIndex}>{`(${t(ayaObject.surahNumber)}:${t(
        ayaObject.ayatNumber,
      )})`}</Text>
    </View>
  );
};

export default BookmarkListItem;
const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 16,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: 'rgba(112,112,112,0.5)',
    backgroundColor: 'rgba(255,255,255,0.795)',
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 4,
    justifyContent: 'center',
  },
  textView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '70%',
  },
  ayatText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Arial',
    color: '#1A1A1A',
  },
  ayatIndex: {
    textAlign: 'left',
    marginVertical: 4,
    fontSize: 20,
    color: '#C7AA35',
  },
});
