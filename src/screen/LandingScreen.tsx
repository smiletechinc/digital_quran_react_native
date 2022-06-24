import * as React from 'react';
import {View, Text} from 'react-native';
import {styles} from './index';
import {LogoImage} from '../components/images/index';
import {LanguagePicker} from '../components/picker';
import {updateSurah} from '../redux/action/surahAction';
import {updateAyat} from '../redux/action/verseAction';
import {connect, useDispatch} from 'react-redux';

import surahMeta from '../resources/surahMeta.json';
import Quran from '../resources/SurahIndex';
import {useEffect} from 'react';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateSurah, updateAyat} = props;

  useEffect(() => {
    // console.log('Surah Meta data from JSOn', Object.values(surahMeta));
    updateSurah(Object.values(surahMeta));
    var arr = Object.values(Quran.name).forEach(surahAyat => {
      // console.log('surah Quran', Object.values(surahAyat));
      updateAyat(surahAyat);
    });
    // if (index === null) {
    //   return Quran.name;
    // }
    // return Quran.name[index];
  }, [navigation]);
  const LogFunc = () => {
    navigation.replace('HomeScreen');
  };

  return (
    <View style={styles.selectionContainer}>
      <LogoImage />
      <LanguagePicker onPress={LogFunc} />
    </View>
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

// export default LandingScreen;
export default connect(null, mapDispatchToProps)(LandingScreen);
