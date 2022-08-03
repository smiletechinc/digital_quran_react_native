import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './index';
import {backgroundAppImage, selectionIcon} from '../constants/images';
import {AppImageHeader} from '../components/images';
import {LanguageContext, LanguageContextType} from '../context/languageContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {StatusBar} from 'expo-status-bar';
import {PrimaryButton} from '../components/buttons';
import {useTranslation} from 'react-i18next';
import {updateSurah} from '../redux/action/surahAction';
import {connect, useDispatch} from 'react-redux';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
  route: any;
  reduxVerses: any;
  reduxSurahs: any;
  reduxParahs: any;
  updated: any;
};

let updatedOuter = false;

const HomeScreen: React.FunctionComponent<Props> = props => {
  // const {navigation, updateSurah, updateAyat} = props;
  const {
    navigation,
    route,
    updateSurah,
    reduxSurahs,
    reduxParahs,
    updateAyat,
    reduxVerses,
    updated,
  } = props;
  const {t} = useTranslation();
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;
  const {addPara} = React.useContext(ParaContext) as ParaContextType;
  const {setVersesObject} = React.useContext(VerseContext) as QuranContextType;
  const [surahSelectIconVisible, setSurahSelectIconVisible] =
    React.useState(false);
  const [paraSelectIconVisible, setParaSelectIconVisible] =
    React.useState(false);
  React.useEffect(() => {
    if (reduxVerses) {
      setVersesObject(reduxVerses);
      let allSurah: any = [];
      Object.values(reduxVerses).forEach(surahAyat => {
        allSurah.push(surahAyat);
      });

      var arrayParaIndex: any = [];
      Object.values(reduxParahs).forEach((para: any) => {
        arrayParaIndex.push(para.paraIndex);
      });

      let allPara: any = [];
      for (
        let currentParaIndex = 0;
        currentParaIndex < 30;
        currentParaIndex++
      ) {
        var currentParah: any = [];

        let paraFirstSurahNumber = Number(
          reduxParahs[currentParaIndex].ayahOfSurah[0].firstAyah.surahIndex,
        );
        let paraFirstSurahIndex = paraFirstSurahNumber - 1;
        let paraLastSurahNumber = Number(
          reduxParahs[currentParaIndex].ayahOfSurah[
            reduxParahs[currentParaIndex].ayahOfSurah.length - 1
          ].lastAyah.surahIndex,
        );
        let paraLastSurahIndex = paraLastSurahNumber - 1;
        let lastParaSurahVerseIndex = Number(
          reduxParahs[currentParaIndex].ayahOfSurah[
            reduxParahs[currentParaIndex].ayahOfSurah.length - 1
          ].lastAyah.ayahIndex.split('_')[1],
        );
        let startValue = 0;
        for (
          let currentSuahIndex = paraFirstSurahIndex;
          currentSuahIndex <= paraLastSurahIndex;
          currentSuahIndex++
        ) {
          let currentSurahAyats = Object.values(
            allSurah[currentSuahIndex].verse,
          );
          let currentVerses: any = [];

          let firstSurahVerseIndex = Number(
            reduxParahs[currentParaIndex].ayahOfSurah[
              startValue
            ].firstAyah.ayahIndex.split('_')[1],
          );
          startValue = startValue + 1;
          for (
            let i = firstSurahVerseIndex;
            i < currentSurahAyats.length;
            i++
          ) {
            if (
              i > lastParaSurahVerseIndex &&
              paraLastSurahIndex === currentSuahIndex
            )
              break;
            else {
              currentVerses.push(currentSurahAyats[i]);
            }
          }
          let currentSurah = {
            surah_number: currentSuahIndex + 1,
            surah_name: reduxSurahs[currentSuahIndex].titleArabic,
            verses: currentVerses,
          };
          currentParah.push(currentSurah);
        }
        let para = {
          para_number: currentParaIndex + 1,
          paraDetail: currentParah,
        };
        allPara.push(para);
      }
      addPara(allPara);
    }
  }, [navigation]);

  const LogFunc = () => {
    if (surahSelectIconVisible) {
      navigation.navigate('SuraReadingScreen');
    } else if (paraSelectIconVisible) {
      navigation.navigate('ParaReadingScreen');
    } else {
      Alert.alert('nothing');
    }
  };

  const paraArray = () => {
    setParaSelectIconVisible(true), setSurahSelectIconVisible(false);
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
                  paraArray();
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

const mapStateToProps = (state: {
  verses: {verses: any};
  parahs: {parahs: any};
  surahs: {surahs: any};
}) => {
  return {
    reduxVerses: state.verses.verses,
    reduxParahs: state.parahs.parahs,
    reduxSurahs: state.surahs.surahs,
    updated: !updatedOuter,
  };
};
const mapDispatchToProps = (
  dispatch: (arg0: {type: string; surah?: SurahMeta; ayat?: QuranMeta}) => void,
) => {
  return {
    updateSurah: (updateSurahData: SurahMeta) => {
      dispatch(updateSurah(updateSurahData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
