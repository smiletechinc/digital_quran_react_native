import React, {useEffect, useState} from 'react';
import {View, FlatList, TextInput, Image} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import {ListItem} from '../components/List/index';
import ScreenWrapperWithHeader from '../components/wrapper/HeaderWrapper';
import {StatusBar} from 'expo-status-bar';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {searchIcon} from '../constants/images';
import {t} from 'i18next';

type Props = {
  navigation: any;
  route: any;
  reduxSurahs: any;
  updated: boolean;
};

let updatedOuter = false;

const SuraReadingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route, reduxSurahs, updated} = props;
  const [surahIntro, setSurahInto] = useState();
  const {setSurahObject} = React.useContext(SurahContext) as SurahContextType;
  const [textValue, setChangeText] = React.useState('');

  useEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: 'yellow'},
    });
    setSurahInto(reduxSurahs);
  }, [navigation]);

  const moveFunction = (surahdata: any) => {
    setSurahObject(surahdata);
    navigation.navigate('SurahScreen');
  };
  const renderItem = ({item}: any) => {
    return <ListItem surah={item} onPress={() => moveFunction(item)} />;
  };

  return (
    <ScreenWrapperWithHeader
      title="Digital Quran"
      navigation={navigation}
      hideBackButton={true}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#00B4AC',
          },
        ]}>
        <View
          style={styles.searchBarView}
          onTouchEnd={() => navigation.navigate('Search')}>
          <TextInput
            value={textValue}
            onChangeText={text => setChangeText(text)}
            placeholder={t('search here')}
          />
          <Image source={searchIcon} />
        </View>
        <FlatList
          style={styles.listContainer}
          data={surahIntro}
          renderItem={renderItem}
        />
      </View>
      <StatusBar style="light" backgroundColor="#00B4AC" />
    </ScreenWrapperWithHeader>
  );
};

const mapStateToProps = (state: {surahs: {surahs: any}}) => {
  return {
    reduxSurahs: state.surahs.surahs,
    updated: !updatedOuter,
  };
};

export default connect(mapStateToProps)(SuraReadingScreen);
