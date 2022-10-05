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
// import {FetchTextFromImageHook} from '../hooks/textRecongApiHook';
import ContentLoader, {Rect} from 'react-content-loader/native';

type Props = {
  navigation: any;
};
const {width, height} = Dimensions.get('window');
const uploadAnimation = require('../resources/animation/fetchingTextApi.json');
let camera: Camera;

const CameraSearchScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  // const {
  //   getAyahImageHook,
  //   apiResponseTextData,
  //   fetching,
  //   cancelAPi,
  //   cancelRequest,
  // } = FetchTextFromImageHook();
  const [imagePath, setImagePath] = useState<string | null>(null);

  // useEffect(() => {
  //   if (cancelRequest) {
  //     navigation.goBack();
  //   }
  // }, [cancelRequest]);
  // useEffect(() => {
  //   if (apiResponseTextData) {
  //     if (
  //       !Object.values(apiResponseTextData)[0] &&
  //       Object.values(apiResponseTextData)[1] != undefined
  //     ) {
  //       const imageObject = {
  //         imageCapture: imagePath,
  //         apiText: Object.values(apiResponseTextData)[1],
  //       };
  //       navigation.navigate('home', {imageObject});
  //     } else if (Object.values(apiResponseTextData)[0]) {
  //       Alert.alert(
  //         'Oops',
  //         `${Object.values(apiResponseTextData)[1]}, Please Try Again`,
  //       );
  //     }
  //   }
  // }, [apiResponseTextData]);

  const takePictureAsync = async () => {
    const photo = await camera.takePictureAsync({
      quality: 0,
    });
    console.log('photo when take picture', photo);
    // launchEditor(photo.uri);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log('photo when upload picture', result);
    if (!result.cancelled) {
      // setImage(result.uri);
      setImagePath(result.uri);
      let filename = result.uri ? result.uri.split('/').pop() : '';
      // Infer the type of the image
      let match = filename?.split('.');
      let type = match ? `image/${match[1]}` : `image`;
      // getAyahImageHook(result.uri, filename, type);
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
      {/* {fetching && (
        <ContentLoader
          speed={1.8}
          backgroundColor={'#ffffff'}
          foregroundColor={'#999'}
          title="Loading"
          viewBox="0 26 360 70">
          <Rect x="30" y="40" rx="8" ry="16" width="300" height="60%" />
        </ContentLoader>
      )} */}
      <TouchableOpacity
        style={styles.mainGalleryButton}
        onPress={() => pickImage()}>
        <Folder />
      </TouchableOpacity>
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
    // flexDirection: 'column',
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
