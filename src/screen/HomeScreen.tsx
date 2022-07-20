import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './index';
import {backgroundAppImage, selectionIcon} from '../constants/images';
import {AppImageHeader} from '../components/images';
import {LanguageContext, LanguageContextType} from '../context/languageContext';
import {StatusBar} from 'expo-status-bar';
import ScreenWrapperWithHeader from '../components/wrapper/HeaderWrapper';
import {PrimaryButton} from '../components/buttons';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
};

const HomeScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateSurah, updateAyat} = props;
  const {t} = useTranslation();
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;
  const [surahSelectIconVisible, setSurahSelectIconVisible] =
    React.useState(false);
  const [paraSelectIconVisible, setParaSelectIconVisible] =
    React.useState(false);
  const LogFunc = () => {
    navigation.navigate('ReadingScreen');
  };

  return (
    <ScrollView>
      <View style={[styles.selectionContainer, {paddingTop: '20%'}]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 50,
          }}>
          <AppImageHeader />
          <View style={{top: '4%'}}>
            <View>
              <Text style={styles.selectionLanguageText}>
                Select Option Search
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.homeScreenButton}
                onPress={() => {
                  setParaSelectIconVisible(true),
                    setSurahSelectIconVisible(false);
                }}>
                {paraSelectIconVisible && (
                  <View style={styles.homeScreenImageView}>
                    <Image source={selectionIcon} />
                  </View>
                )}

                <View
                  style={{
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.homeScreenText}>Para</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.homeScreenButton}
                onPress={() => {
                  setSurahSelectIconVisible(true),
                    setParaSelectIconVisible(false);
                }}>
                {surahSelectIconVisible && (
                  <View style={styles.homeScreenImageView}>
                    <Image source={selectionIcon} />
                  </View>
                )}
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.homeScreenText}>Surah</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {!surahSelectIconVisible && !paraSelectIconVisible && (
            <TouchableOpacity
              style={{
                width: '70%',
                flex: 1,
                padding: 12,
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: '90%',
                borderColor: '#00B4AC',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: '#1CB4AC',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 14,
                  textAlign: 'center',
                }}>
                {t('next')}
              </Text>
            </TouchableOpacity>
          )}
          {(surahSelectIconVisible || paraSelectIconVisible) && (
            <PrimaryButton title={t('next')} onPress={LogFunc} />
          )}
        </View>
        <View style={{position: 'absolute', opacity: 1, right: 2}}>
          <Image source={backgroundAppImage} style={{resizeMode: 'cover'}} />
        </View>
        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
