import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
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
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backBtn2} from '../constants/images';
import {AuthContext, AuthContextType} from '../context/authContext';

type Props = {
  navigation: any;
  updateAyat: any;
  updateSurah: any;
  updatePara: any;
  reduxUser: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateAyat, updateSurah, updatePara, reduxUser} = props;
  const {setAuthUser} = React.useContext(AuthContext) as AuthContextType;
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;

  useEffect(() => {
    Object.values(Quran.name).forEach(surahAyat => {
      updateAyat(surahAyat);
    });

    updateSurah(Object.values(surahMeta));
    updatePara(Object.values(paraMeta));
  }, [navigation]);

  const LogFunc = () => {
    setAuthUser(reduxUser);
    reduxUser.email === ''
      ? navigation.replace('LandingScreenContainer')
      : navigation.replace('HomeScreen');
  };

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={[styles.selectionContainer, {minHeight: SCREEN_HEIGHT}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{left: 16}}>
          <Image
            source={backBtn2}
            style={{width: 32, height: 32, backgroundColor: '#FFFFFF'}}
          />
        </TouchableOpacity>
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
        <View style={{position: 'absolute', opacity: 1}}>
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

const maptStateToProps = (state: {userObject: {authUser: any}}) => {
  return {
    reduxUser: state.userObject.authUser,
  };
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

export default connect(maptStateToProps, mapDispatchToProps)(LandingScreen);
