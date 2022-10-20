import React, {FunctionComponent, useEffect} from 'react';
import {TouchableOpacity, View, ScrollView, Image} from 'react-native';
import {AppImageHeader} from '../components/images';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/index';
import styles from './ScreenStyles';
import {useTranslation} from 'react-i18next';
import {backgroundAppImage, backBtn2} from '../constants/images';
import {PrimaryButton} from '../components/buttons';
import i18n from '../components/localization/i18n';
import {StatusBar} from 'expo-status-bar';

type Props = {
  navigation: any;
  updateAyat: any;
  updateSurah: any;
  updatePara: any;
};

const LandingScreenContainer: FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {t} = useTranslation();
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
          <View style={{marginTop: SCREEN_HEIGHT / 3}}>
            <PrimaryButton
              title={t('login')}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              buttonMargin={SCREEN_HEIGHT / 8}
              buttonMarginBottom={16}
            />
            <PrimaryButton
              title={t('signUp')}
              onPress={() => {
                navigation.navigate('Signup');
              }}
              buttonMarginBottom={12}
            />
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
export default LandingScreenContainer;
