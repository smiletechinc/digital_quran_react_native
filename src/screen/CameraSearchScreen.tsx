import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {searchImage, backBtn2, backBtn} from '../constants/images';
import {SCREEN_WIDTH} from '../constants/index';
import * as ImagePicker from 'expo-image-picker';
import {Camera as CameraIcon, Folder} from '../components/cameraIcons';
import {FetchTextFromImageHook} from '../hooks/textRecongApiHook';

type Props = {
  navigation: any;
};

const CameraSearchScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {getAyahImageHook, apiResponseTextData} = FetchTextFromImageHook();
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
      console.log('apiResponseTextData', Object.values(apiResponseTextData)[0]);
    }
  }, [apiResponseTextData]);

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
      <TouchableOpacity
        style={styles.mainGalleryButton}
        onPress={() => pickImage()}>
        <Folder />
      </TouchableOpacity>
      {/* {imagePath && (
        <Image source={{uri: imagePath}} style={{width: 200, height: 200}} />
      )} */}
    </View>
  );
};

export default CameraSearchScreen;
const styles = StyleSheet.create({
  // camera: {
  //   height: height / 2 + 100,
  //   width,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderRadius: 20,
  // },
  selectionContainer: {
    display: 'flex',
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? (SCREEN_WIDTH / 10) * 2 : 10,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
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
