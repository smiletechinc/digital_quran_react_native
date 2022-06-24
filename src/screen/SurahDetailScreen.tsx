import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import Quran from '../resources/SurahIndex';
import {styles, textStyles} from './index';
import {MushafButton} from '../components/buttons/index';
import {Alert} from 'react-native';
import {connect} from 'react-redux';

const MushafImage = require('../resources/images/MushafMode.png');

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

let updatedOuter = false;
const SurahScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route, reduxVerses, updated} = props;
  const {suarahIndex} = route.params.index;
  const [surahData, setSurahData] = useState<string[]>();
  const [bismillahAyah, setBismillahAyah] = useState();
  const [mushafState, setMushafState] = useState<boolean>(true);

  console.log('routeParams: ', route.params.index);
  console.log('index:', suarahIndex);

  const MushafNavigation = () => {
    if (mushafState) {
      setMushafState(false);
    } else {
      setMushafState(true);
    }

    console.log('mushafstate:', mushafState);
    // navigation.navigate('MushafReading', route.params);
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#57BBC1',
      },
      title: `${route.params.titleArabic}`,
      headerRight: () => (
        <MushafButton icon={MushafImage} onPress={MushafNavigation} />
      ),
    });
    var surah: any[] = [];
    const arr = reduxVerses.map((verses: any, index: any) =>
      route.params.index === verses.index ? (surah = verses.verse) : '',
    );
    setSurahData(Object.values(surah));
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
