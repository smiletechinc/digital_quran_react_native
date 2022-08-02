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

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#57BBC1',
      },
      title: `${paraObject.titleArabic}`,
    });
    if (paraData) {
      Object.values(paraData).forEach((element: any) => {
        if (Number(paraObject.paraIndex) === element.para_number) {
          setParaDataDisplay(element.paraDetail);
        }
      });
    }
  }, [navigation, mushafState, paraDataDisplay]);
  return (
    <ScrollView style={{marginTop: 64}}>
      <Text style={styles.bismillahText}> {bismillahAyah}</Text>
      <View style={styles.mushafView}>
        <Text style={styles.nestedText}>
          {paraDataDisplay &&
            paraDataDisplay.map((element, index) => {
              console.log('element', element);
              let paraSurha = element.surah_name;

              let paraVerse = element.verses;
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
                    {paraSurha}
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
            })}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ParaDetailScreen;
