import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
// import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Custom UI components.
// import {COLORS, SCREEN_WIDTH} from '../../constants';
// import {TextInput} from '../../global-components/input';
// import SignupFooterComponent from './components/SignupFooterComponent';
// import PlayingStyle from './components/YourPlayingStyle';
import {useTranslation} from 'react-i18next';
import {PrimaryButton, TextButton} from '../components/buttons';
import AppTextInput from '../components/input/colors_app_textinput';
import {StatusBar} from 'expo-status-bar';
// Custom Styles
// import globalStyles from '../../global-styles';
import styles from './ScreenStyles';
import {AppImageHeader} from '../components/images';
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backgroundAppImage, backBtn2} from '../constants/images';
import {userAuthencticationHook} from '../hooks/userAuthentication';
// import {StackActions, NavigationActions} from 'react-navigation';
// import {
//   signUpService,
//   signInService,
//   registerUserService,
// } from './../../services/authenticationServices';
// import {UserObject} from '../../types';
// const signupMainImage = require('../../assets/images/small-logo.png');
// const backIcon = require('../../assets/images/back-icon.png');

type Props = {
  navigation: any;
};
const SignupScreen: FunctionComponent<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {SignUpService} = userAuthencticationHook();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    setNameError('');
    setPasswordError('');
    setEmailError('');
    setConfirmPasswordError('');
  }, [name, email, password, confirmpassword]);

  // const navigtaionNext = () => {
  //   if (password !== confirmPassword) {
  //     Alert.alert('Trainify', 'Password and Confirm password does not match');
  //   } else if (password.length < 6) {
  //     Alert.alert('Trainify', 'Password should contain at-lease 6 characters.');
  //   } else {
  //     const signupObject = {
  //       email,
  //       password,
  //       firstName,
  //       middleName,
  //       lastName,
  //       playerstyle: handStyle === 0 ? 'LeftHanded' : 'RightHanded',
  //     };

  //     const authObject = {
  //       email,
  //       password,
  //     };
  //     navigation.navigate('SignupContainer', {signupObject, authObject});
  //   }
  // };

  // const validateForInputs = () => {
  //   if (email === '') {
  //     return false;
  //   }
  //   if (password === '') {
  //     return false;
  //   }
  //   if (confirmPassword === '') {
  //     return false;
  //   }
  //   if (firstName === '') {
  //     return false;
  //   }
  //   if (lastName === '') {
  //     return false;
  //   }
  //   return true;
  // };
  const proceedToSignup = () => {
    const authObject = {
      email,
      password,
    };
    SignUpService(authObject);
    // signUpService(authObject, authenticationSuccess, authenticationFailure); // Async function
  };

  const LogFunc = () => {
    if (name.trim().length == 0) {
      setNameError('Please Enter Name');
    } else if (email.trim().length == 0) {
      setEmailError('please enter email');
    } else if (password.trim().length == 0) {
      setPasswordError('Please enter password');
    } else if (confirmpassword.trim().length == 0) {
      setConfirmPasswordError('Please enter confirm password');
    } else if (password != confirmpassword) {
      Alert.alert('Password does not match with Confirm Password');
    } else {
      proceedToSignup();
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: '#FFFFFF'}}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.selectionContainer, {minHeight: SCREEN_HEIGHT}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{left: 16, zIndex: 50}}>
          <Image source={backBtn2} style={{width: 32, height: 32}} />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 50,
          }}>
          <AppImageHeader />
          <View
            style={{
              minHeight: SCREEN_HEIGHT / 1.48,
              justifyContent: 'flex-end',
            }}>
            <View>
              <AppTextInput
                placeholder="Enter Full Name"
                onChangeText={(text: any) => setName(text)}
                defaultValue={name}
                error={nameError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder="Enter Email"
                onChangeText={(text: any) => setEmail(text)}
                defaultValue={email}
                error={emailError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder="Enter Password"
                onChangeText={(text: any) => setPaswword(text)}
                secureTextEntry={true}
                defaultValue={password}
                error={passwordError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder="Enter Confirm Password"
                onChangeText={(text: any) => setConfirmPassword(text)}
                secureTextEntry={true}
                defaultValue={confirmpassword}
                error={confirmPasswordError}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                paddingTop: '4%',
              }}>
              <PrimaryButton
                title={t('register')}
                onPress={() => {
                  LogFunc();
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 16}
              />
              <Text
                style={{color: '#00B4AC', fontSize: 16, textAlign: 'center'}}>
                Already Account
              </Text>
              <PrimaryButton
                title={t('login')}
                onPress={() => {
                  navigation.replace('Sigin');
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 28}
              />
            </View>
          </View>
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
export default SignupScreen;
