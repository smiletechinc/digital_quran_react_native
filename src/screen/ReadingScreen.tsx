import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import {ListItem} from '../components/List/index';
import ScreenWrapperWithHeader from '../components/wrapper/HeaderWrapper';
import {StatusBar} from 'expo-status-bar';
import {SurahContext, SurahContextType} from '../context/surahContext';

type Props = {
  navigation: any;
  route: any;
  reduxSurahs: any;
  updated: boolean;
};

let updatedOuter = false;

const ReadingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route, reduxSurahs, updated} = props;
  const [surahIntro, setSurahInto] = useState();
  const {surahObject, setSurahObject} = React.useContext(
    SurahContext,
  ) as SurahContextType;

  useEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: 'yellow'},
    });
    setSurahInto(reduxSurahs);
  }, [navigation]);

  const moveFunction = (surahdata: any) => {
    setSurahObject(surahdata);
    console.log('surhaObject ', surahObject);
    navigation.navigate('SurahScreen', surahdata);
  };
  const renderItem = ({item}: any) => {
    return <ListItem surah={item} onPress={() => moveFunction(item)} />;
  };

  return (
    <ScreenWrapperWithHeader
      title="Digital Quran"
      navigation={navigation}
      hideBackButton={false}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#00B4AC',
          },
        ]}>
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

const mapStateToProps = (state: {
  surahs: {surahs: any};
  verses: {verses: any};
}) => {
  return {
    reduxSurahs: state.surahs.surahs,
    updated: !updatedOuter,
  };
};

export default connect(mapStateToProps)(ReadingScreen);