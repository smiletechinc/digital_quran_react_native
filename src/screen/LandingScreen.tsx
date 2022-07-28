import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from './index';
import {LanguagePicker} from '../components/picker';
import {updateAyat} from '../redux/action/verseAction';
import {connect, useDispatch} from 'react-redux';
import Quran from '../resources/SurahIndex';
import {backgroundAppImage} from '../constants/images';
import {AppImageHeader} from '../components/images';
import {LanguageContext, LanguageContextType} from '../context/languageContext';
import {StatusBar} from 'expo-status-bar';
import surahMeta from '../resources/surahMeta.json';
import paraMeta from '../resources/paraMeta.json';
import {updateSurah} from '../redux/action/surahAction';
import {updatePara} from '../redux/action/paraAction';

type Props = {
  navigation: any;
  updateAyat: any;
  updateSurah: any;
  updatePara: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateAyat, updateSurah, updatePara} = props;
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;

  useEffect(() => {
    // let allSurah: any = [];
    var arr = Object.values(Quran.name).forEach(surahAyat => {
      updateAyat(surahAyat);
      // allSurah.push(surahAyat);
    });

    updateSurah(Object.values(surahMeta));
    updatePara(Object.values(paraMeta));
    // var arrayParaIndex: any = [];
    // Object.values(paraMeta).forEach(para => {
    //   console.log('para', para.paraIndex), arrayParaIndex.push(para.paraIndex);
    // });

    // // let allPara: any = [];
    // for (
    //   let currentParaIndex = 0;
    //   currentParaIndex < paraMeta.length;
    //   currentParaIndex++
    // ) {
    //   console.log('paraMeta', paraMeta[currentParaIndex].ayahOfSurah);
    //   var currentParah: any = [];

    //   let firstSurahNumber = Number(
    //     paraMeta[currentParaIndex].ayahOfSurah[0].firstAyah.surahIndex,
    //   );
    //   let firstSurahIndex = firstSurahNumber - 1;
    //   let firstIndex = Number(
    //     paraMeta[currentParaIndex].ayahOfSurah[0].firstAyah.ayahIndex.split(
    //       '_',
    //     )[1],
    //   );
    //   let lastIndex =
    //     paraMeta[currentParaIndex].ayahOfSurah[0].lastAyah.ayahIndex.split(
    //       '_',
    //     )[1];

    //   let lastSurahNumber = Number(
    //     paraMeta[currentParaIndex].ayahOfSurah[
    //       paraMeta[currentParaIndex].ayahOfSurah.length - 1
    //     ].lastAyah.surahIndex,
    //   );
    //   let lastSurahIndex = lastSurahNumber - 1;
    //   let lastIndex_ = Number(
    //     paraMeta[currentParaIndex].ayahOfSurah[
    //       paraMeta[currentParaIndex].ayahOfSurah.length - 1
    //     ].lastAyah.ayahIndex.split('_')[1],
    //   );

    //   console.log('firstSurahIndex', lastIndex);
    //   for (
    //     let currentSuahIndex = firstSurahIndex;
    //     currentSuahIndex <= lastSurahIndex;
    //     currentSuahIndex++
    //   ) {
    //     let currentSurahAyats = Object.values(allSurah[currentSuahIndex].verse);
    //     let currentVerses: any = [];

    //     for (let i = firstIndex; i < currentSurahAyats.length; i++) {
    //       if (i > lastIndex_ && lastSurahIndex === currentSuahIndex) {
    //         break;
    //       } else {
    //         currentVerses.push(currentSurahAyats[i]);
    //         // currentParah.push(currentSurahAyats[i]);
    //       }
    //     }

    //     let currentSurah = {
    //       surah_number: currentSuahIndex + 1,
    //       verses: currentVerses,
    //     };
    //     currentParah.push(currentSurah);
    //   }
    //   console.log('firstSurahNumber', currentParah);
    // }
  }, [navigation]);

  const LogFunc = () => {
    navigation.replace('HomeScreen');
  };

  return (
    <ScrollView>
      <View style={styles.selectionContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 50,
          }}>
          <AppImageHeader />
          <View>
            <Text style={styles.languageAppText}>Digital Quran</Text>
            <Text style={styles.selectionLanguageText}>Select Language</Text>
          </View>
          <LanguagePicker onPress={LogFunc} />
        </View>
        <View style={{position: 'absolute', opacity: 1, right: 2}}>
          <Image source={backgroundAppImage} style={{resizeMode: 'cover'}} />
        </View>
        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    surah?: SurahMeta;
    ayat?: QuranMeta;
    para?: ParaMeta;
  }) => void,
) => {
  return {
    updateAyat: (updateVerseData: QuranMeta) => {
      dispatch(updateAyat(updateVerseData));
    },
    updateSurah: (updateSurahData: SurahMeta) => {
      dispatch(updateSurah(updateSurahData));
    },
    updatePara: (updateParaData: ParaMeta) => {
      dispatch(updatePara(updateParaData));
    },
  };
};

export default connect(null, mapDispatchToProps)(LandingScreen);
