import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from './index';
import {LanguagePicker} from '../components/picker';
import {updateAyat} from '../redux/action/verseAction';
import {connect, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
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
  // const {t} = useTranslation();

  useEffect(() => {
    Object.values(Quran.name).forEach(surahAyat => {
      updateAyat(surahAyat);
    });

    updateSurah(Object.values(surahMeta));
    updatePara(Object.values(paraMeta));
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
