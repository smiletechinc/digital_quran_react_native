import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PrimaryButton, TextButton} from '../components/buttons';
import AppTextInput from '../components/input/colors_app_textinput';
import {StatusBar} from 'expo-status-bar';
import styles from './ScreenStyles';
import {AppImageHeader} from '../components/images';
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backgroundAppImage, backBtn2} from '../constants/images';
import {userAuthencticationHook} from '../hooks/userAuthentication';

type Props = {
  navigation: any;
};
const SignupScreen: FunctionComponent<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {
    SignUpService,
    userCreateId,
    RegisterUser,
    userRegister,
    userCreateError,
    setUserCreateError,
  } = userAuthencticationHook();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNameError('');
    setPasswordError('');
    setEmailError('');
    setConfirmPasswordError('');
  }, [name, email, password, confirmpassword]);

  useEffect(() => {
    if (userCreateId != '') {
      const userObject = {
        id: userCreateId,
        name,
        email,
      };
      RegisterUser(userObject);
    }
  }, [userCreateId]);

  useEffect(() => {
    if (userCreateError != '') {
      if (userCreateError === 'Firebase: Error (auth/invalid-email).') {
        Alert.alert(
          `${t('digital quran')}`,
          `${t('enter the correct email.')}`,
        );
        setUserCreateError('');
      }
    }
  }, [userCreateError]);
  useEffect(() => {
    if (userRegister) {
      setIsLoading(false);
      navigation.replace('SignIn');
    }
  }, [userRegister]);

  const proceedToSignup = () => {
    if (password !== confirmpassword) {
      Alert.alert(
        `${t('digital quran')}`,
        `${t('password does not match with confirm password')}`,
      );
    } else if (password.length < 6) {
      Alert.alert(
        `${t('digital quran')}`,
        `${t('password should contain at-lease 6 characters.')}`,
      );
    } else {
      const authObject = {
        email,
        password,
      };
      SignUpService(authObject);
    }
  };

  const LogFunc = () => {
    setIsLoading(true);
    if (name.trim().length == 0) {
      setNameError(t('please enter name'));
      setIsLoading(false);
    } else if (email.trim().length == 0) {
      setEmailError(t('please enter email'));
      setIsLoading(false);
    } else if (password.trim().length == 0) {
      setPasswordError('Please enter password');
      setIsLoading(false);
    } else if (confirmpassword.trim().length == 0) {
      setConfirmPasswordError(t('please enter confirm password'));
      setIsLoading(false);
    } else if (password != confirmpassword) {
      Alert.alert(t('password does not match with confirm password'));
      setIsLoading(false);
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
                placeholder={`${t('enter full name')}`}
                onChangeText={(text: any) => setName(text)}
                defaultValue={name}
                error={nameError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder={`${t('enter email')}`}
                onChangeText={(text: any) => setEmail(text)}
                defaultValue={email}
                error={emailError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder={`${t('enter password')}`}
                onChangeText={(text: any) => setPaswword(text)}
                secureTextEntry={true}
                defaultValue={password}
                error={passwordError}
              />
            </View>
            <View>
              <AppTextInput
                placeholder={`${t('enter confirm password')}`}
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
                isLoading={isLoading}
                onPress={() => {
                  LogFunc();
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 16}
              />
              <Text
                style={{color: '#00B4AC', fontSize: 16, textAlign: 'center'}}>
                {t('already account')}
              </Text>
              <PrimaryButton
                title={t('login')}
                onPress={() => {
                  navigation.replace('SignIn');
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
