import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {styles, textStyles} from './index';
import {MushafButton} from '../components/buttons/index';
import {connect, useSelector} from 'react-redux';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import {createIconSetFromFontello} from 'react-native-vector-icons';
const MushafImage = require('../resources/images/MushafMode.png');

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

let updatedOuter = false;

// const selectVerses = (state: {verses: any}) => state.verses;

const ParaDetailScreen: React.FunctionComponent<Props> = props => {
  const {surahObject} = React.useContext(SurahContext) as SurahContextType;
  const {paraData, paraObject} = React.useContext(
    ParaContext,
  ) as ParaContextType;
  const {navigation, route, reduxVerses, updated} = props;
  const [paraDataDisplay, setParaDataDisplay] = useState<any[]>([]);
  const [bismillahAyah, setBismillahAyah] = useState();
  const [mushafState, setMushafState] = useState<boolean>(true);

  // console.log('routeParams: ', Object.values(surahObject)[5]);
  // console.log('index:', Object.values(surahObject)[5]);

  const MushafNavigation = () => {
    if (mushafState) {
      setMushafState(false);
    } else {
      setMushafState(true);
    }

    // console.log('mushafstate:', mushafState);
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

    // console.log('paraObject', paraObject);
    // console.log('allPara', paraData);
    if (paraData) {
      Object.values(paraData).forEach((element: any) => {
        if (Number(paraObject.paraIndex) === element.para_number) {
          setParaDataDisplay(element.paraDetail);
        } else {
          // console.log('oopss');
        }
      });
    }
    // console.log('paraDataDisplay', paraDataDisplay.length);

    // let paraVerses: any = [];
    // let paraSurah: any = [];

    // for (
    //   let paraDivided = 0;
    //   paraDivided < paraDataDisplay.length;
    //   paraDivided++
    // ) {
    //   // console.log('paraDivided', paraDataDisplay[paraDivided]);
    //   paraSurah.push(paraDataDisplay[paraDivided].surah_number);
    //   paraVerses.push(paraDataDisplay[paraDivided].verses);
    //   // console.log('paraSurahIndex', paraSurah.indexOf(paraSurah[paraDivided]));
    //   // console.log(
    //   //   'paraVerseIndex',
    //   //   paraVerses.indexOf(paraVerses[paraDivided]),
    //   // );
    //   if (
    //     paraSurah.indexOf(paraSurah[paraDivided]) ===
    //     paraVerses.indexOf(paraVerses[paraDivided])
    //   ) {
    //     console.log('paraSurah', paraSurah[paraDivided]);
    //     console.log('paraVerses', paraVerses[paraDivided]);
    //   } else {
    //     console.log('NotparaSurah', paraSurah[paraDivided]);
    //   }
    //   // for (
    //   //   let paraVersesLength = 0;
    //   //   paraVersesLength < paraDataDisplay[paraDivided].verses.length;
    //   //   paraVersesLength++
    //   // ) {
    //   //   console.log('paraVerseLength', paraVersesLength);
    //   // }
    //   // console.log('paraDivided', paraVerses);
    // }
    // console.log('paraSurah', paraSurah);
    // console.log('paraVerses', paraVerses);
    // paraDataDisplay.forEach((para: any) => {
    //   // console.log('paraArray', para);
    //   paraSurah.push(para.surah_number);
    //   paraVerses.push(para.verses);
    // });
    // console.log('paraSurah', paraSurah);
    // console.log('paraVerses', paraVerses);
    // let paraInfo = paraData.filter((para: any) => {
    //   // Object.values(paraObject)[2] === para.para_number
    //   //   ? console.log('para after Filter', para)
    //   //   : console.log('not found');
    //   console.log('para', paraObject.paraIndex === para.para_number);
    // });
    // const quran = useSelector(state => state.verses.verses);
    // console.log('qurna', quran);
    // var surah: any[] = [];
    // reduxVerses.map((verses: any, index: any) =>
    //   route.params.index === verses.index ? (surah = verses.verse) : '',
    // );
    // setSurahData(Object.values(surah));
    // console.log('suraHObject', Object.values(surahObject));
  }, [navigation, mushafState, paraDataDisplay]);

  //   console.log('SurahData: ', surahData);

  //   const renderItem = ({item, index}: any) => {
  //     if (index === 0) {
  //       setBismillahAyah(item);
  //     }
  //     if (index > 0) {
  //       return (
  //         <View style={styles.itemContainer}>
  //           <Text>{index}</Text>
  //           <Text style={styles.itemText}>{item}</Text>
  //           <Text>{}</Text>
  //         </View>
  //       );
  //     }
  //   };
  return (
    <ScrollView style={{marginTop: 64}}>
      <Text style={styles.bismillahText}> {bismillahAyah}</Text>
      <View style={styles.mushafView}>
        <Text style={styles.nestedText}>
          {
            paraDataDisplay &&
              // paraDataDisplay.map((element, index) => {
              //   // console.log('paraDataDisplay', element);
              //   return (
              //     <StyledText textStyles={textStyles}>
              //       {`${element.verses} <demo>${index} </demo>`}
              //     </StyledText>
              //   );
              // })
              paraDataDisplay.map((element, index) => {
                let paraSurha = element.surah_number;

                let paraVerse = element.verses;
                // console.log('paraDataDisplay', paraVerse);
                return (
                  <View>
                    <Text
                      style={{
                        textShadowOffset: {width: 3, height: 3},
                        textShadowColor: '#464646',
                        textShadowRadius: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'red',
                        paddingLeft: 8,
                        marginLeft: 16,
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderColor: '#0000',
                      }}>
                      {' '}
                      {`Surah Number ${paraSurha}`}
                    </Text>
                    {paraVerse &&
                      paraVerse.map((verses: any, index: any) => {
                        console.log('verses', verses);
                        return (
                          <StyledText textStyles={textStyles}>
                            {`${verses} <demo>${index} </demo>`}
                          </StyledText>
                        );
                      })}
                  </View>
                );
                // Object.values(element.surah_number).map(
                //   (para: any, index: any) => {
                //     return (
                //       <Text
                //         style={{
                //           textShadowOffset: {width: 3, height: 3},
                //           textShadowColor: '#464646',
                //           textShadowRadius: 10,
                //           fontSize: 16,
                //           fontWeight: 'bold',
                //           color: 'red',
                //           paddingLeft: 8,
                //           marginLeft: 16,
                //           borderStyle: 'solid',
                //           borderWidth: 2,
                //           borderColor: '#0000',
                //         }}>
                //         {' '}
                //         {para}
                //       </Text>
                //     );
                //   },
                // );
                // return (
                //   <StyledText textStyles={textStyles}>
                //     {`${element.verses} <demo>${index} </demo>`}
                //   </StyledText>
                // );
              })
            // for (
            //   let paraDivided = 0;
            //   paraDivided < 1;
            //   paraDivided++
            // ) {
            //   // console.log('paraDivided', paraDataDisplay[paraDivided]);
            //   paraSurah.push(paraDataDisplay[paraDivided].surah_number);
            //   paraVerses.push(paraDataDisplay[paraDivided].verses);
            //   // console.log('paraSurahIndex', paraSurah.indexOf(paraSurah[paraDivided]));
            //   // console.log(
            //   //   'paraVerseIndex',
            //   //   paraVerses.indexOf(paraVerses[paraDivided]),
            //   // );
            //   if (
            //     paraSurah.indexOf(paraSurah[paraDivided]) ===
            //     paraVerses.indexOf(paraVerses[paraDivided])
            //   ) {
            //     console.log('paraSurah', paraSurah[paraDivided]);
            //     console.log('paraVerses', paraVerses[paraDivided]);
            //   } else {
            //     console.log('NotparaSurah', paraSurah[paraDivided]);
            //   }
            //   // for (
            //   //   let paraVersesLength = 0;
            //   //   paraVersesLength < paraDataDisplay[paraDivided].verses.length;
            //   //   paraVersesLength++
            //   // ) {
            //   //   console.log('paraVerseLength', paraVersesLength);
            //   // }
            //   // console.log('paraDivided', paraVerses);
            // }
          }
        </Text>
      </View>
    </ScrollView>
    // <></>
  );
};

// const mapStateToProps = (state: {verses: {verses: any}}) => {
//   console.log('data comes from reudx', state.verses.verses);
//   return {
//     reduxVerses: state.verses.verses,
//     updated: !updatedOuter,
//   };
// };

// export default connect(mapStateToProps)(SurahScreen);
export default ParaDetailScreen;
