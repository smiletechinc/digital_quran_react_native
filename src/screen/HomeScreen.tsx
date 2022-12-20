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
import {connect} from 'react-redux';
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
import {ParaMakeHook} from '../hooks/paraMakeHook';
import {SCREEN_HEIGHT, SCREEN_WIDTH, typeIOS} from '../constants/index';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
  route: any;
  reduxVerses: any;
  reduxSurahs: any;
  reduxParahs: any;
  reduxfavVerses: any;
  reduxUser: any;
  updated: any;
};

let updatedOuter = false;

const HomeScreen: React.FunctionComponent<Props> = props => {
  const {
    navigation,
    reduxSurahs,
    reduxParahs,
    reduxVerses,
    reduxfavVerses,
    reduxUser,
  } = props;
  const {t} = useTranslation();
  const {setVersesObject} = React.useContext(VerseContext) as QuranContextType;
  const [surahSelectIconVisible, setSurahSelectIconVisible] =
    React.useState(false);
  const [paraSelectIconVisible, setParaSelectIconVisible] =
    React.useState(false);
  const {makePara} = ParaMakeHook();
  const {fetchBookmark} = FirebaseDataHook();
  const {bookVerseValues} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;

  React.useEffect(() => {
    if (reduxVerses) {
      setVersesObject(reduxVerses);
      makePara(reduxVerses, reduxParahs, reduxSurahs);
      fetchBookmark(reduxUser.id);
      console.log('red', reduxfavVerses);
      bookVerseValues(reduxfavVerses);
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
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={[styles.selectionContainer, {minHeight: SCREEN_HEIGHT}]}>
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
            <PrimaryButton
              title={t('next')}
              onPress={LogFunc}
              buttonMargin={SCREEN_HEIGHT / 4}
            />
          ) : (
            <SecondaryButton title={t('next')} />
          )}
        </View>
        <View style={{position: 'absolute', opacity: 1, right: 2}}>
          <Image
            source={backgroundAppImage}
            style={{
              resizeMode: 'cover',
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
          />
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
  bookMarkVerses: {favBooks: any};
  userObject: {authUser: any};
}) => {
  return {
    reduxVerses: state.verses.verses,
    reduxParahs: state.parahs.parahs,
    reduxSurahs: state.surahs.surahs,
    reduxfavVerses: state.bookMarkVerses.favBooks,
    reduxUser: state.userObject.authUser,
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
