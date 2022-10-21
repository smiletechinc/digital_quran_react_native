import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './index';
import {useTranslation} from 'react-i18next';
import {AppIcon} from '../constants/images';
import {PrimaryButton} from '../components/buttons/index';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/';
import {userAuthencticationHook} from '../hooks/userAuthentication';
import LogoutAlertModal from '../model/LogoutAlerModel';

type Props = {
  navigation: any;
  updateSurah: any;
  updateAyat: any;
  route: any;
  reduxVerses: any;
  reduxSurahs: any;
  reduxParahs: any;
  updated: any;
};

const SettingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, reduxSurahs, reduxParahs, reduxVerses} = props;
  const {t} = useTranslation();
  const {
    deleteAccountService,
    logoutService,
    deleteAccountUser,
    setDeleteAccountUser,
    logoutUser,
    setLogoutUser,
  } = userAuthencticationHook();
  const [logOutCheck, setLogOutCheck] = useState(false);
  const [deleteAccountCheck, setDeleteAccountCheck] = useState(false);

  useEffect(() => {
    if (logoutUser) {
      // logoutUser();
      const userAuth: UserObject = {
        id: '',
        email: '',
        name: '',
      };
      // add(userAuth);
      setLogoutUser(false);
      navigation.replace('LandingScreen');
    }
    if (deleteAccountUser) {
      const userAuth: UserObject = {
        id: '',
        email: '',
        name: '',
      };
      // add(userAuth);
      setDeleteAccountUser(false);
      navigation.replace('LandingScreen');
    }
  }, [logoutUser, deleteAccountUser]);

  const proceedToLogout = () => {
    logoutService();
  };

  const proceedToDeleteAccount = () => {
    deleteAccountService();
  };
  const LogFunc = () => {
    navigation.navigate('LandingScreen');
  };

  return (
    <ScrollView
      style={{backgroundColor: '#00B4AC'}}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.selectionContainer, {minHeight: SCREEN_HEIGHT}]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
          }}>
          <Image source={AppIcon} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: SCREEN_HEIGHT / 1.6,
            justifyContent: 'center',
          }}>
          <PrimaryButton
            title={t('change language')}
            onPress={() => {
              LogFunc();
            }}
            buttonMarginBottom={SCREEN_HEIGHT / 16}
          />
          <PrimaryButton
            title={t('logout')}
            onPress={() => {
              setLogOutCheck(true);
              setDeleteAccountCheck(false);
            }}
            buttonMarginBottom={SCREEN_HEIGHT / 16}
          />
          <PrimaryButton
            title={t('delete account')}
            onPress={() => {
              setDeleteAccountCheck(true);
              setLogOutCheck(false);
            }}
            buttonMarginBottom={SCREEN_HEIGHT / 16}
          />
        </View>
      </View>
      {deleteAccountCheck && (
        <LogoutAlertModal
          visible={deleteAccountCheck}
          title={'DELETE ACCOUNT'}
          desc={'Delete Your Account'}
          buttonTitle={'Delete'}
          onAcceptButton={() => proceedToDeleteAccount()}
          onCancelButton={() => setDeleteAccountCheck(false)}
        />
      )}
      {logOutCheck && (
        <LogoutAlertModal
          visible={logOutCheck}
          title={'Logout'}
          desc={'Logout from your account'}
          buttonTitle={'Logout'}
          onAcceptButton={() => proceedToLogout()}
          onCancelButton={() => setLogOutCheck(false)}
        />
      )}
    </ScrollView>
  );
};

export default SettingScreen;
