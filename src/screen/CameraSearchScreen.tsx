import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {searchImage, backBtn2, backBtn} from '../constants/images';
import {SCREEN_WIDTH} from '../constants/index';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {CameraClickIcon, Folder} from '../components/cameraIcons';
import {FetchTextFromImageHook} from '../hooks/textRecongApiHook';
import ContentLoader, {Rect} from 'react-content-loader/native';
import axios from 'axios';

type Props = {
  navigation: any;
};
const {width, height} = Dimensions.get('window');
const uploadAnimation = require('../resources/animation/fetchingTextApi.json');
let camera: Camera;

const CameraSearchScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  // const [fetching, setFetching] = useState(false);
  const {getAyahImageHook, apiResponseTextData, fetching} =
    FetchTextFromImageHook();
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (apiResponseTextData) {
      if (
        !Object.values(apiResponseTextData)[0] &&
        Object.values(apiResponseTextData)[1] != undefined
      ) {
        const imageObject = {
          imageCapture: imagePath,
          apiText: Object.values(apiResponseTextData)[1],
        };
        navigation.navigate('home', {imageObject});
      } else if (Object.values(apiResponseTextData)[0]) {
        Alert.alert(
          'Oops',
          `${Object.values(apiResponseTextData)[1]}, Please Try Again`,
        );
      }
    }
  }, [apiResponseTextData]);

  const takePictureAsync = async () => {
    const photo = await camera.takePictureAsync({
      quality: 0,
    });
    console.log('photo when take picture', photo);
    // launchEditor(photo.uri);
  };
  // const getAyahImageHook = async (
  //   photoUri: any,
  //   photoName: any,
  //   photoType: any,
  // ) => {
  //   setFetching(true);
  //   // setApiResponseTextData({});

  //   // new Promise(async (resolve, reject) => {
  //   try {
  //     const URL_ = 'https://api.ocr.space/parse/image';
  //     var headers = {
  //       'Content-Type': 'multipart/form-data',
  //       apikey: 'K88634971788957',
  //     };
  //     const imageToSend = {
  //       uri: photoUri,
  //       type: photoType,
  //       name: photoName,
  //     };
  //     var formBody = new FormData();
  //     formBody.append('url', imageToSend.uri);
  //     formBody.append('file', imageToSend);
  //     formBody.append('language', 'ara');
  //     formBody.append('scale', 'true');
  //     var responseObject = {
  //       isErrorProcessing: false,
  //       text: '',
  //     };
  //     axios
  //       .post(URL_, formBody, {
  //         headers: headers,
  //       })
  //       .then((resonse: any) => {
  //         console.log('resonse.data.IsErroredOnProcessing', resonse);
  //         const responseCheck = resonse.data.IsErroredOnProcessing;
  //         // var rawResponse;
  //         // if (!responseCheck) {
  //         //   Object.values(resonse.data).forEach((resoponseData: any) => {
  //         //     Object.values(resoponseData).forEach(
  //         //       (responseDataInnder: any) => {
  //         //         if (Object.values(responseDataInnder)[3]) {
  //         //           rawResponse = Object.values(responseDataInnder)[3];
  //         //           responseObject = {
  //         //             isErrorProcessing: false,
  //         //             text: JSON.stringify(rawResponse),
  //         //           };
  //         //         }
  //         //       },
  //         //     );
  //         //   });
  //         // } else {
  //         //   rawResponse = Object.values(resonse.data.ErrorMessage);
  //         //   responseObject = {
  //         //     isErrorProcessing: true,
  //         //     text: rawResponse.toString(),
  //         //   };
  //         // }
  //       })
  //       .catch((e: any) => {
  //         console.log('error', e);
  //         responseObject = {
  //           isErrorProcessing: true,
  //           text: e.toString(),
  //         };
  //       });
  //     // if (responseObject) {
  //     //   if (
  //     //     !Object.values(responseObject)[0] &&
  //     //     Object.values(responseObject)[1] != undefined
  //     //   ) {
  //     //     const imageObject = {
  //     //       imageCapture: imagePath,
  //     //       apiText: Object.values(responseObject)[1],
  //     //     };
  //     //     navigation.navigate('home', {imageObject});
  //     //   } else if (Object.values(responseObject)[0]) {
  //     //     Alert.alert(
  //     //       'Oops',
  //     //       `${Object.values(responseObject)[1]}, Please Try Again`,
  //     //     );
  //     //   }
  //     // }
  //     // setApiResponseTextData(responseObject);
  //     setFetching(false);
  //   } catch (err) {
  //     setFetching(false);
  //     console.log(err);
  //   }
  //   // });
  // };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImagePath(result.uri);
      let filename = result.uri ? result.uri.split('/').pop() : '';
      let match = filename?.split('.');
      let type = match ? `image/${match[1]}` : `image`;
      getAyahImageHook(result.uri, filename, type);
    }
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {
          backgroundColor: '#00B4AC',
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{left: 16}}>
        <Image source={backBtn} style={{width: 32, height: 32}} />
      </TouchableOpacity>
      {fetching && (
        <ContentLoader
          speed={1.8}
          backgroundColor={'#ffffff'}
          foregroundColor={'#999'}
          title="Loading"
          viewBox="0 26 360 70">
          <Rect x="30" y="40" rx="8" ry="16" width="300" height="60%" />
        </ContentLoader>
      )}
      <TouchableOpacity
        style={styles.mainGalleryButton}
        onPress={() => pickImage()}>
        <Folder />
      </TouchableOpacity>

      {imagePath != null && (
        <View>
          <Image source={{uri: imagePath}} />
        </View>
      )}
    </View>
  );
};

export default CameraSearchScreen;
const styles = StyleSheet.create({
  camera: {
    height: height / 2 + 100,
    width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  selectionContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? (SCREEN_WIDTH / 10) * 2 : 10,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  mainCameraButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: `rgba(249, 249, 249, 0.8)`,
    position: 'absolute',
    bottom: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowColor: 'black',
    shadowRadius: 8,
  },
  mainGalleryButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: `rgba(249, 249, 249, 0.8)`,
    position: 'absolute',
    bottom: 90,
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowColor: 'black',
    shadowRadius: 8,
  },
});
