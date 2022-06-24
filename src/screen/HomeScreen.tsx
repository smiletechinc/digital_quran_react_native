import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles} from './index';
import surahMeta from '../resources/surahMeta.json';
import {connect, useDispatch} from 'react-redux';
import {ListItem} from '../components/List/index';

type Props = {
  navigation: any;
  route: any;
  reduxSurahs: any;
  updated: boolean;
};

let updatedOuter = false;

const HomeScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route, reduxSurahs, updated} = props;
  const [surahIntro, setSurahInto] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#57BBC1',
      },
    });
    setSurahInto(reduxSurahs);
    console.log('update suarah intor', surahIntro);
  }, [navigation]);

  const SampleFunction = (surahdata: any) => {
    navigation.navigate('SurahScreen', surahdata);
  };
  const renderItem = ({item}: any) => {
    console.log('item', item);
    return <ListItem surah={item} onPress={() => SampleFunction(item)} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={surahIntro}
        renderItem={renderItem}
      />
    </View>
  );
};

const mapStateToProps = (state: {
  surahs: {surahs: any};
  verses: {verses: any};
}) => {
  console.log('data comes from reudx', state.verses.verses);
  return {
    reduxSurahs: state.surahs.surahs,
    updated: !updatedOuter,
  };
};

export default connect(mapStateToProps)(HomeScreen);
// export default HomeScreen;
