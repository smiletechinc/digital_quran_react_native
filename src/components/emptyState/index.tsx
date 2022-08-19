import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {favEmptyStateImage} from '../../constants/images';
import {PrimaryButton} from '../buttons';

type Props = {
  onPress?: any;
  buttonTitle: any;
  surahStateValue: boolean;
};

const EmptyState: React.FunctionComponent<Props> = props => {
  const {onPress, surahStateValue, buttonTitle} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          source={favEmptyStateImage}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
      <View style={styles.TextView}>
        <Text style={styles.HeadingText}>
          Add {surahStateValue ? 'Surah' : 'Ayat'}
        </Text>
        <Text style={styles.descriptionText}>
          There is nothing {surahStateValue ? 'Surah' : 'Ayat'} Bookmark on your
          screen, please add the ayats from reading Quran. For Read Quran, Click
          on Below Button
        </Text>
        <PrimaryButton
          title={t(buttonTitle)}
          onPress={onPress}
          isFavoriteCalled={true}
        />
      </View>
    </View>
  );
};

export default EmptyState;
const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    paddingTop: 180,
  },
  imageView: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  TextView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  HeadingText: {
    textAlign: 'center',
    color: '#D49C35',
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: '700',
    lineHeight: 64,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Arial',
  },
});
