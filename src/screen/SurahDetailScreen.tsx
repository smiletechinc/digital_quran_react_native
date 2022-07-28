import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {styles, textStyles} from './index';
import {MushafButton} from '../components/buttons/index';
import {connect, useSelector} from 'react-redux';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import {VerseContext, QuranContextType} from '../context/quranContext';
const MushafImage = require('../resources/images/MushafMode.png');

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

let updatedOuter = false;

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {surahObject} = React.useContext(SurahContext) as SurahContextType;
  const {allPara} = React.useContext(ParaContext) as ParaContextType;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {navigation, route, reduxVerses, updated} = props;
  const [surahData, setSurahData] = useState<Object[]>();
  const [bismillahAyah, setBismillahAyah] = useState();
  const [mushafState, setMushafState] = useState<boolean>(true);
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
    // console.log('paras from context', versesObject);
    // console.log('SurahData: ', surahData);
    var surah: any[] = [];
    // let surahVerse = versesObject.filter((verses: any, index: any) =>
    //   Object.values(surahObject)[5] === verses.index ? {verses.verse, break;} : '',
    // );
    versesObject.forEach((element: any) => {
      // console.log('surahVerse', element.index);
      if (Object.values(surahObject)[5] === element.index) {
        // console.log('surahVerse', element.verse);
        setSurahData(Object.values(element.verse));
      }
    });
    console.log('surahVerseArray', surahData);
    // setSurahData(Object.values(surah));
    // console.log('suraHObject', Object.values(surahObject));
  }, [navigation, mushafState]);

  const renderItem = ({item, index}: any) => {
    // if (index === 0) {
    //   setBismillahAyah(item);
    // }
    // if (index > 0) {
    //   return (
    //     <View style={styles.itemContainer}>
    //       <Text>{index}</Text>
    //       <Text style={styles.itemText}>{item}</Text>
    //       <Text>{}</Text>
    //     </View>
    //   );
    // }
    return (
      <View style={styles.itemContainer}>
        <Text>{index}</Text>
        <Text style={styles.itemText}>{item}</Text>
        {/* <Text>{}</Text> */}
      </View>
    );
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
      {/* <FlatList
        style={styles.listContainer}
        data={surahData}
        renderItem={renderItem}
      /> */}
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
  // return <></>;
};

// const mapStateToProps = (state: {verses: {verses: any}}) => {
//   console.log('data comes from reudx', state.verses.verses);
//   return {
//     reduxVerses: state.verses.verses,
//     updated: !updatedOuter,
//   };
// };

// export default connect(mapStateToProps)(SurahScreen);
export default SurahScreen;
