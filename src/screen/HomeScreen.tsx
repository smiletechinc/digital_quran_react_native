import * as React from 'react';
import {View, Image, ScrollView, Alert} from 'react-native';
import {styles} from './index';
import {backgroundAppImage} from '../constants/images';
import {AppImageHeader} from '../components/images';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {StatusBar} from 'expo-status-bar';
import {
  PrimaryButton,
  HomeChoiceButton,
  SecondaryButton,
} from '../components/buttons';
import {useTranslation} from 'react-i18next';
import {updateSurah} from '../redux/action/surahAction';
import {connect, useDispatch} from 'react-redux';
import {ParaMakeHook} from '../hooks/paraMakeHook';

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
  const {navigation, reduxSurahs, reduxParahs, reduxVerses} = props;
  const {t} = useTranslation();
  const {setVersesObject} = React.useContext(VerseContext) as QuranContextType;
  const [surahSelectIconVisible, setSurahSelectIconVisible] =
    React.useState(false);
  const [paraSelectIconVisible, setParaSelectIconVisible] =
    React.useState(false);
  const {makePara} = ParaMakeHook();

  React.useEffect(() => {
    if (reduxVerses) {
      setVersesObject(reduxVerses);
      makePara(reduxVerses, reduxParahs, reduxSurahs);
    }
  }, [navigation]);

  const LogFunc = () => {
    if (surahSelectIconVisible) {
      navigation.navigate('SuraReadingScreen');
    } else if (paraSelectIconVisible) {
      navigation.navigate('ParaReadingScreen');
    }
  };

  const paraArray = () => {
    setParaSelectIconVisible(true), setSurahSelectIconVisible(false);
  };

  return (
    <ScrollView>
      <View style={[styles.selectionContainer, {paddingTop: '20%'}]}>
        <View style={styles.homeView}>
          <AppImageHeader />
          <HomeChoiceButton
            surahSelectIconVisible={surahSelectIconVisible}
            setSurahSelectIconVisible={setSurahSelectIconVisible}
            paraSelectIconVisible={paraSelectIconVisible}
            setParaSelectIconVisible={setParaSelectIconVisible}
            paraPress={() => paraArray()}
          />
          {surahSelectIconVisible || paraSelectIconVisible ? (
            <PrimaryButton title={t('next')} onPress={LogFunc} />
          ) : (
            <SecondaryButton title={t('next')} />
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
