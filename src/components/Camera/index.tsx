// import { Camera as ExpoCamera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
// importing components
import {Camera as CameraIcon, Folder} from '../cameraIcons';
import {ImageEditor} from 'expo-image-editor';

const {width, height} = Dimensions.get('window');

// let camera: ExpoCamera;

export type CameraProps = {
  hasPermissionCamera: boolean;
  hasPermissionPicker: boolean;
  recognizeImage: (
    imagePath: string,
    imageName: any,
    imageType: string,
  ) => void;
};

const Camera = ({recognizeImage}: CameraProps) => {
  const [imageUri, setImageUri] = useState('');
  const [editorVisible, setEditorVisible] = useState(false);

  // const launchEditor = (uri: string) => {
  //   setImageUri(uri);
  //   setEditorVisible(true);
  // };

  // const takePictureAsync = async () => {
  //   const photo = await camera.takePictureAsync({
  //     quality: 0,
  //   });
  //   console.log("photo when take picture", photo);
  //   launchEditor(photo.uri);
  // };

  const editFunctionComplete = (value: any) => {
    console.log('value', value);
    let filename = value.uri.split('/').pop();
    let match = filename?.split('.');
    let type = match ? `image/${match[1]}` : `image`;
    recognizeImage(value.uri, filename, type);
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
      let filename = result.uri ? result.uri.split('/').pop() : '';
      // Infer the type of the image
      let match = filename?.split('.');
      let type = match ? `image/${match[1]}` : `image`;
      recognizeImage(result.uri, filename, type);
    }
  };

  return (
    <TouchableOpacity style={styles.mainGalleryButton} onPress={pickImage}>
      <Folder />
    </TouchableOpacity>
    // <ExpoCamera
    //   style={styles.camera}
    //   type={ExpoCamera.Constants.Type}
    //   ref={(r) => (camera = r)}
    //   ratio="1:1"
    // >
    //   {/* <TouchableOpacity
    //     style={styles.mainCameraButton}
    //     onPress={takePictureAsync}
    //   >
    //     <CameraIcon />
    //   </TouchableOpacity> */}
    //   <TouchableOpacity style={styles.mainGalleryButton} onPress={pickImage}>
    //     <Folder />
    //   </TouchableOpacity>
    //   {/* <ImageEditor
    //     visible={editorVisible}
    //     onCloseEditor={() => setEditorVisible(false)}
    //     imageUri={imageUri}
    //     fixedCropAspectRatio={1 / 1}
    //     // lockAspectRatio={true}
    //     minimumCropDimensions={{
    //       width: 100,
    //       height: 100,
    //     }}
    //     onEditingComplete={(result) => {
    //       editFunctionComplete(result);
    //     }}
    //     mode="crop-only"
    //   /> */}
    // </ExpoCamera>
  );
};

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

export default Camera;
