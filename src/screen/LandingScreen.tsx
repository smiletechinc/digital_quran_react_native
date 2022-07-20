import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from './index';
import {LanguagePicker} from '../components/picker';
import {updateSurah} from '../redux/action/surahAction';
import {updateAyat} from '../redux/action/verseAction';
import {connect, useDispatch} from 'react-redux';
import surahMeta from '../resources/surahMeta.json';
import Quran from '../resources/SurahIndex';
import {backgroundAppImage} from '../constants/images';
import {AppImageHeader} from '../components/images';
import {LanguageContext, LanguageContextType} from '../context/languageContext';
import {StatusBar} from 'expo-status-bar';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateSurah, updateAyat} = props;
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;

  useEffect(() => {
    updateSurah(Object.values(surahMeta));
    var arr = Object.values(Quran.name).forEach(surahAyat => {
      updateAyat(surahAyat);
    });
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
  dispatch: (arg0: {type: string; surah?: SurahMeta; ayat?: QuranMeta}) => void,
) => {
  return {
    updateSurah: (updateSurahData: SurahMeta) => {
      dispatch(updateSurah(updateSurahData));
    },
    updateAyat: (updateVerseData: QuranMeta) => {
      dispatch(updateAyat(updateVerseData));
    },
  };
};

export default connect(null, mapDispatchToProps)(LandingScreen);
