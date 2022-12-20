import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
  Image,
} from 'react-native';
import {PrimaryButton, TextButton} from '../components/buttons';
import {useTranslation} from 'react-i18next';
import {AppImageHeader} from '../components/images';
import AppTextInput from '../components/input/colors_app_textinput';
import {StatusBar} from 'expo-status-bar';
import {useDispatch, useSelector} from 'react-redux';
// Custom UI components.
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backgroundAppImage, backBtn2} from '../constants/images';
import styles from './ScreenStyles';
import {userAuthencticationHook} from '../hooks/userAuthentication';
import {updateUser} from '../redux/action/userAction';

type Props = {
  navigation?: any;
  route?: any;
};

const SigninScreen: FunctionComponent<Props> = props => {
  const {
    SignInService,
    getUserCredentialId,
    getUserDetail,
    userRecievedObject,
    userRecivedError,
    setUserRecievedError,
  } = userAuthencticationHook();
  const {t} = useTranslation();
  const {navigation, route} = props;
  const [email, setEmail] = useState<string>(''); // Testing@gmail.com
  const [password, setPassword] = useState<string>(''); // 123456
  const [passwordError, setPasswordError] = useState('');
  const [emailErrorDisc, setEmailErroDisc] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmailErroDisc('');
    setPasswordError('');
    setUserRecievedError('');
  }, [email, password]);

  useEffect(() => {
    if (getUserCredentialId != '') {
      getUserDetail(JSON.parse(getUserCredentialId));
    }
  }, [getUserCredentialId]);

  useEffect(() => {
    if (userRecievedObject.email != '') {
      console.log('userRecievedObject', userRecievedObject);
      dispatch(updateUser(userRecievedObject));
      navigation.replace('HomeScreen');
    }
  }, [userRecievedObject]);

  useEffect(() => {
    if (userRecivedError != '') {
      if (userRecivedError === 'Firebase: Error (auth/user-not-found).') {
        Alert.alert(
          `${t('digital quran')}`,
          `${t(
            'this user was not regiesterd. please enter the correct email',
          )}`,
        );
      } else if (
        userRecivedError === 'Firebase: Error (auth/wrong-password).'
      ) {
        Alert.alert(
          `${t('digital quran')}`,
          `${t(
            '    enter the correct password. Or click on the forgot password button to reset the password',
          )}`,
        );
      }
      setUserRecievedError('');
    }
  }, [userRecivedError]);
  const proceedToLogin = () => {
    const authObject = {
      email,
      password,
    };
    SignInService(authObject);
  };

  const loginCheck = () => {
    if (email.trim().length == 0) {
      setEmailErroDisc(t('please enter email'));
    } else if (password.trim().length == 0) {
      setPasswordError(t('please enter password'));
    } else {
      proceedToLogin();
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
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
              }}>
              <AppTextInput
                placeholder={`${t('enter email')}`}
                onChangeText={(text: string) => setEmail(text)}
                defaultValue={email}
                error={emailErrorDisc}
              />
              <AppTextInput
                placeholder={`${t('enter password')}`}
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={true}
                defaultValue={password}
                error={passwordError}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                paddingTop: '4%',
              }}>
              <PrimaryButton
                title={t('login')}
                onPress={() => {
                  loginCheck();
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 16}
              />
              <Text
                style={{color: '#00B4AC', fontSize: 16, textAlign: 'center'}}>
                {t('If you have not register, then click on')}
              </Text>
              <PrimaryButton
                title={t('signUp')}
                onPress={() => {
                  navigation.navigate('Signup');
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 28}
              />
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TextButton
                title={t('forgot password')}
                onPress={() => {
                  navigation.navigate('ResetPassword');
                }}
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
export default SigninScreen;
