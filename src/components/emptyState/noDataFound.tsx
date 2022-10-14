import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../buttons';
type Props = {
  onPress?: any;
  buttonTitle: any;
  surahStateValue?: boolean;
  searchScreen?: boolean;
  imageDisplay: any;
};

const NoDataFound: React.FunctionComponent<Props> = props => {
  const {onPress, surahStateValue, buttonTitle, searchScreen, imageDisplay} =
    props;
  const {t} = useTranslation();
  console.log('hi');
  let text1 = t('No Data Found');
  let textIdentifier = surahStateValue ? 'surah' : 'ayat';
  let text2 = t('bookmark on  your screen, please add the');
  let text3 = t('from reading quran.');
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.mainView,
          searchScreen ? {paddingTop: 128} : {paddingTop: 180},
        ]}>
        <View style={styles.imageView}>
          <Image
            source={imageDisplay}
            style={{backgroundColor: 'transparent'}}
          />
        </View>
        <View style={styles.TextView}>
          {searchScreen ? (
            <Text style={styles.HeadingText}>{t('No Data Found')}</Text>
          ) : (
            <Text style={styles.HeadingText}>{`${t('add')} ${t(
              textIdentifier,
            )}`}</Text>
          )}
          {searchScreen ? (
            <Text style={styles.descriptionText}>
              {t('for advanced search, click on below button')}
            </Text>
          ) : (
            <Text style={styles.descriptionText}>{`${text1} ${t(
              textIdentifier,
            )} ${text2} ${t(textIdentifier)} ${text3}  ${'\n'} ${t(
              'for read quran, click on below button',
            )}`}</Text>
          )}
          <PrimaryButton
            title={t(buttonTitle)}
            onPress={onPress}
            isFavoriteCalled={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NoDataFound;
const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
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
