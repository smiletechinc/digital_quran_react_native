import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './index';
import {useTranslation} from 'react-i18next';
import {AppIcon} from '../constants/images';
import {PrimaryButton} from '../components/buttons/index';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/';
import {userAuthencticationHook} from '../hooks/userAuthentication';
import LogoutAlertModal from '../model/LogoutAlerModel';
import {connect} from 'react-redux';
import {updateUser} from '../redux/action/userAction';
import {StackActions} from '@react-navigation/native';

type Props = {
  navigation: any;
  route: any;
  updated: any;
  updateUser?: any;
};

const SettingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, updateUser} = props;
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

  // useEffect(() => {
  //   console.log('userID', Object.values());
  // }, []);
  useEffect(() => {
    if (logoutUser) {
      // logoutUser();
      const userAuth: UserObject = {
        email: '',
        id: '',
        name: '',
      };
      // add(userAuth);
      setLogoutUser(false);
      updateUser(userAuth);
      navigation.dispatch(StackActions.replace('LandingScreen'));
    }
    if (deleteAccountUser) {
      const userAuth: UserObject = {
        email: '',
        id: '',
        name: '',
      };
      // add(userAuth);
      setDeleteAccountUser(false);
      updateUser(userAuth);
      navigation.dispatch(StackActions.replace('LandingScreen'));
    }
  }, [logoutUser, deleteAccountUser]);

  const proceedToLogout = () => {
    setLogOutCheck(false);
    logoutService();
  };

  const proceedToDeleteAccount = () => {
    deleteAccountService();
  };
  const LogFunc = () => {
    navigation.replace('LandingScreen');
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
const mapStateToProps = (state: {userObject: {authUser: any}}) => {
  console.log('user', state.userObject.authUser.id);
  // return {
  //   updateUser: (updateUserValue: UserObject) => {
  //     dispatch(updateUser(updateUserValue));
  //   },
  // };
};
const mapDispatchToProps = (
  dispatch: (arg0: {type: string; user?: UserObject}) => void,
) => {
  return {
    updateUser: (updateUserValue: UserObject) => {
      dispatch(updateUser(updateUserValue));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
