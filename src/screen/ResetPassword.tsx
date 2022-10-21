import React, {FunctionComponent, useState, useEffect} from 'react';
import {TouchableOpacity, View, ScrollView, Image, Alert} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {PrimaryButton, TextButton} from '../components/buttons';
import {AppImageHeader} from '../components/images';
import {useTranslation} from 'react-i18next';
import AppTextInput from '../components/input/colors_app_textinput';
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants/index';
import styles from './ScreenStyles';
import {backgroundAppImage, backBtn2} from '../constants/images';
import {userAuthencticationHook} from '../hooks/userAuthentication';

type Props = {
  navigation?: any;
  route?: any;
};

const ResetPasswordContainer: FunctionComponent<Props> = props => {
  const {navigation, route} = props;
  const [email, setEmail] = useState<string>('');
  const [emailErrorDisc, setEmailErroDisc] = useState('');
  const {t} = useTranslation();
  const {
    resetPasswordError,
    setResetPasswordError,
    resetPasswordSevice,
    resetPasswordEmailSend,
    setResetPasswordSend,
  } = userAuthencticationHook();

  useEffect(() => {
    setEmailErroDisc('');
  }, [email]);

  useEffect(() => {
    if (resetPasswordEmailSend) {
      Alert.alert(
        'Digital Quran',
        'Send a password reset email to your registered email account. if not shown please check the spam',
      );
      setResetPasswordSend(false);
    }
  }, [resetPasswordEmailSend]);
  useEffect(() => {
    if (resetPasswordError != '') {
      if (resetPasswordError === 'Firebase: Error (auth/user-not-found).') {
        Alert.alert('Digital Quran', `Account doesn't exist.`);
        setResetPasswordError('');
      }
    }
  }, [resetPasswordError]);

  const resetCheck = () => {
    if (email.trim().length == 0) {
      setEmailErroDisc('Please Enter Email');
    } else {
      resetPasswordSevice(email);
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
              marginTop: '48%',
              minHeight: SCREEN_HEIGHT / 2,
              justifyContent: 'space-evenly',
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
            </View>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                paddingTop: '4%',
              }}>
              <PrimaryButton
                title={t('forgot password')}
                onPress={() => {
                  resetCheck();
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 16}
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
export default ResetPasswordContainer;
