import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {styles} from './index';
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
    // console.log('paraDataDisplay', paraDataDisplay);
  }, [navigation, mushafState, paraDataDisplay]);
  return (
    <ScrollView
      style={[
        {
          backgroundColor: '#57BBC1',
          // marginTop: 4,
        },
      ]}>
      <Text style={styles.bismillahText}> {bismillahAyah}</Text>
      <View style={[styles.mushafView, {marginTop: 0}]}>
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
          }}>
          {paraDataDisplay &&
            paraDataDisplay.map((element, index) => {
              let paraSurha = element.surah_name;
              let paraVerse = element.verses;
              return (
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'red',
                      fontSize: 26,
                    }}>
                    {paraSurha}
                  </Text>
                  <Text>
                    {paraVerse &&
                      paraVerse.map((ayat: any, index: any) => (
                        <Text
                          key={index}
                          allowFontScaling={false}
                          selectable={true}>
                          <Text
                            selectable={true}
                            style={[styles.elementTextStyle, {fontSize: 16}]}>
                            {ayat}
                          </Text>
                          <Text style={[styles.indexTextStyle]}>
                            &#xFD3F;{index}&#xFD3E;
                          </Text>
                        </Text>
                      ))}
                  </Text>
                </View>
              );
            })}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ParaDetailScreen;
