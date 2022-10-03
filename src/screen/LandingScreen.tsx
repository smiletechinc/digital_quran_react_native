import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
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
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants';
import HeaderWithText from '../components/Header/header';
import {backBtn2} from '../constants/images';
import {usePermissions} from 'expo-media-library';
import {useeCameraPermissionsHook} from '../hooks/permissionHook';

type Props = {
  navigation: any;
  updateAyat: any;
  updateSurah: any;
  updatePara: any;
};

const LandingScreen: React.FunctionComponent<Props> = props => {
  const typeIOS =
    Platform.OS === 'ios' ? Platform.constants.interfaceIdiom : 'phone';
  const {navigation, updateAyat, updateSurah, updatePara} = props;
  const {textLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;
  const [status, requestPermission] = usePermissions();
  const {getCameraPermission, requestCameraPermission, permissionStatus} =
    useeCameraPermissionsHook();
  const [alertModalVisible, setAlertVisibleModal] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [descText, setDescText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [galleryPermission, setGalleryPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  // const [image, setImage] = useState(null);

  useEffect(() => {
    console.log('gallery Permission:', status);
    if (status) {
      console.log('gallery Permission:', status.accessPrivileges);
      if (status.status === 'undetermined') {
        requestPermission();
      } else if (status.accessPrivileges === 'all') {
        setGalleryPermission(true);
      } else if (status.accessPrivileges === 'limited') {
        showGalleryPermiisonModal();
      } else if (
        status.status === 'denied' &&
        status.accessPrivileges === 'none'
      ) {
        // showGalleryPermiisonModal();
      }
    } else {
      requestPermission();
    }
  }, [status]);

  useEffect(() => {
    console.log('cameraPermissionsStatus, ', permissionStatus);
    if (permissionStatus === 'unknown') {
      getCameraPermission();
    }
    if (permissionStatus === 'undetermined') {
      requestCameraPermission();
    } else if (permissionStatus === 'denied') {
      showCameraPermissionsModal();
    } else if (permissionStatus === 'granted') {
      setCameraPermission(true);
      // startScreenRecording();
    }
  }, [permissionStatus]);

  const showGalleryPermiisonModal = () => {
    setAlertVisibleModal(true);
    setTitleText('Gallery Permission Denied');
    setDescText('Please Allow the All Permissions of Gallery Permission');
    setButtonText('Go to Settings');
  };

  const showCameraPermissionsModal = () => {
    setAlertVisibleModal(true);
    setTitleText('Camera Permission Denied');
    setDescText(
      'This feature uses camera to function. Trainify would like to access your camera to record your tennis serves and rally for performance review.',
    );
    setButtonText('Go to Settings');
  };
  // const {t} = useTranslation();

  useEffect(() => {
    // console.log('platform', Platform.constants.in);
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
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={[styles.selectionContainer]}>
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
            zIndex: 500,
          }}>
          <AppImageHeader />
          <View>
            <Text style={styles.languageAppText}>Digital Quran</Text>
            <Text style={styles.selectionLanguageText}>Select Language</Text>
          </View>
          <LanguagePicker onPress={LogFunc} />
        </View>
        <View
          style={{
            position: 'absolute',
            opacity: 1,
          }}>
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
