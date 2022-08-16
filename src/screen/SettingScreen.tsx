import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './index';
import {useTranslation} from 'react-i18next';
import {AppIcon} from '../constants/images';
import LinearGradient from 'react-native-linear-gradient';

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

  const LogFunc = () => {
    navigation.navigate('LandingScreen');
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 120},
      ]}>
      <View style={styles.homeView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
          }}>
          <Image source={AppIcon} />
        </View>
        <TouchableOpacity
          onPress={LogFunc}
          style={{
            width: '70%',
            borderRadius: 25,
            alignSelf: 'center',
            marginTop: '90%',
          }}>
          <LinearGradient
            colors={['#00B4AC', '#007F79', '#006763']}
            locations={[0.0, 0.7, 0.9]}
            style={[
              {
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
              },
            ]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 22,
                textAlign: 'center',
              }}>
              {t('Change Language')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
