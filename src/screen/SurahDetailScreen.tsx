import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {styles, textStyles} from './index';
import {MushafButton} from '../components/buttons/index';
import {connect, useSelector} from 'react-redux';
import {SurahContext, SurahContextType} from '../context/surahContext';

const MushafImage = require('../resources/images/MushafMode.png');

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

let updatedOuter = false;

// const selectVerses = (state: {verses: any}) => state.verses;

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {surahObject} = React.useContext(SurahContext) as SurahContextType;
  const {navigation, route, reduxVerses, updated} = props;
  const [surahData, setSurahData] = useState<string[]>();
  const [bismillahAyah, setBismillahAyah] = useState();
  const [mushafState, setMushafState] = useState<boolean>(true);
  // const quranfetch = async () => {
  //   const verses = await useSelector((state: {verses: any}) => {
  //     // const quran = state.verses.verse;
  //     return state.verses;
  //   });
  //   console.log('versesQuran', verses);
  // };
  // quranfetch();
  console.log('routeParams: ', Object.values(surahObject)[5]);
  console.log('index:', Object.values(surahObject)[5]);

  const MushafNavigation = () => {
    if (mushafState) {
      setMushafState(false);
    } else {
      setMushafState(true);
    }

    console.log('mushafstate:', mushafState);
    navigation.navigate('MushafReading', surahObject);
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#57BBC1',
      },
      title: `${Object.values(surahObject)[4]}`,
      headerRight: () => (
        <MushafButton icon={MushafImage} onPress={MushafNavigation} />
      ),
    });

    // const quran = useSelector(state => state.verses.verses);
    // console.log('qurna', quran);
    var surah: any[] = [];
    reduxVerses.map((verses: any, index: any) =>
      route.params.index === verses.index ? (surah = verses.verse) : '',
    );
    setSurahData(Object.values(surah));
    console.log('suraHObject', Object.values(surahObject));
  }, [navigation, mushafState]);

  console.log('SurahData: ', surahData);

  const renderItem = ({item, index}: any) => {
    if (index === 0) {
      setBismillahAyah(item);
    }
    if (index > 0) {
      return (
        <View style={styles.itemContainer}>
          <Text>{index}</Text>
          <Text style={styles.itemText}>{item}</Text>
          <Text>{}</Text>
        </View>
      );
    }
  };
  return mushafState ? (
    <View style={styles.readingcontainer}>
      <Text
        style={[
          styles.bismillahText,
          {justifyContent: 'center', alignSelf: 'center'},
        ]}>
        {' '}
        {bismillahAyah}
      </Text>
      <FlatList
        style={styles.listDetailContainer}
        data={surahData}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <ScrollView style={{marginTop: 64}}>
      <Text style={styles.bismillahText}> {bismillahAyah}</Text>
      <View style={styles.mushafView}>
        <Text style={styles.nestedText}>
          {surahData &&
            surahData.map((element, index) => {
              if (index > 0) {
                return (
                  <StyledText textStyles={textStyles}>
                    {`${element} <demo>${index} </demo>`}
                  </StyledText>
                );
              }
            })}
        </Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: {verses: {verses: any}}) => {
  console.log('data comes from reudx', state.verses.verses);
  return {
    reduxVerses: state.verses.verses,
    updated: !updatedOuter,
  };
};

export default connect(mapStateToProps)(SurahScreen);
// export default SurahScreen;
