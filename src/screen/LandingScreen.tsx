import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {StatusBar} from 'expo-status-bar';
////////////////////////////components//////////////////////////////////////////////
import {AppImageHeader} from '../components/images';
import {LanguagePicker} from '../components/picker';
/////////////redux//////////////////////////////
import {updateAyat} from '../redux/action/verseAction';
///////////////////constant///////////////////////////////
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backgroundAppImage, backBtn2} from '../constants/images';
//////////////////contextAPI///////////////////////////////////////////
import {AuthContext, AuthContextType} from '../context/authContext';
/////////////////HOOKS////////////////////////////////////////////
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
//////////////Resources///////////////////////////////////////
import Quran from '../resources/SurahIndex';
///////////////Styles///////////////////////////////////////////
import {styles} from './index';

type Props = {
  navigation: any;
  updateAyat: any;
  updateSurah: any;
  updatePara: any;
  reduxUser: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateAyat, reduxUser} = props;
  const {setAuthUser} = React.useContext(AuthContext) as AuthContextType;
  const {getSurahMetaData, fetchBookmark, getParaMeta} = FirebaseDataHook();

  useEffect(() => {
    Object.values(Quran.name).forEach(surahAyat => {
      updateAyat(surahAyat);
    });
    getSurahMetaData();
    getParaMeta();
    fetchBookmark();
  }, [navigation]);

  const NextButtonFunction = () => {
    setAuthUser(reduxUser);
    if (reduxUser.email === '') {
      navigation.replace('LandingScreenContainer');
    } else {
      navigation.replace('HomeScreen');
    }
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
          <LanguagePicker onPress={NextButtonFunction} />
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
  dispatch: (arg0: {type: string; ayat?: QuranMeta}) => void,
) => {
  return {
    updateAyat: (updateVerseData: QuranMeta) => {
      dispatch(updateAyat(updateVerseData));
    },
  };
};

export default connect(maptStateToProps, mapDispatchToProps)(LandingScreen);
