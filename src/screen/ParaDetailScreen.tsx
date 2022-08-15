import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import {styles} from './index';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import HeaderDetail from '../components/Header/headerDetail';
import {SurahDetailHook} from '../hooks/surahDetailHook';
import bismillah from '../resources/bismillah.json';

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

const ParaDetailScreen: React.FunctionComponent<Props> = props => {
  const {paraData, paraObject} = React.useContext(
    ParaContext,
  ) as ParaContextType;
  const {navigation, route, reduxVerses, updated} = props;
  const [paraDataDisplay, setParaDataDisplay] = useState<any[]>([]);
  const [bismillahAyah, setBismillahAyah] = useState<Object[]>();

  useEffect(() => {
    if (paraData) {
      Object.values(paraData).forEach((element: any) => {
        if (Number(paraObject.paraIndex) === element.para_number) {
          setParaDataDisplay(element.paraDetail);
        }
      });
      setBismillahAyah(Object.values(bismillah[0]));
    }
  }, [navigation, paraDataDisplay]);

  return (
    <View
      style={[
        styles.selectionContainer,
        {
          backgroundColor: '#57BBC1',
        },
      ]}>
      <HeaderDetail
        surahTitle={Object.values(paraObject.title)}
        surahVerseCount={Object.values(paraObject.titleArabic)}
        navigation={navigation}
        fromSurah={false}
      />
      <View
        style={[
          {
            backgroundColor: '#57BBC1',
            borderRadius: 16,
            marginBottom: 128,
          },
        ]}>
        <ScrollView>
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
                      <View>
                        <View style={styles.paraSurahTitleView}>
                          <Text style={styles.paraSurahTitleText}>
                            {paraSurha}
                          </Text>
                        </View>
                        {element.surah_number !== 9 && (
                          <View style={styles.bismillahView}>
                            <Text style={styles.bismillahText}>
                              {bismillahAyah}
                            </Text>
                            {element.surah_number === 1 && (
                              <Text style={[styles.indexTextStyle]}>
                                &#xFD3E;1 &#xFD3F;
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                      <Text>
                        {paraVerse &&
                          paraVerse.map((ayat: any, index: any) => (
                            <Text
                              key={index}
                              allowFontScaling={false}
                              selectable={true}>
                              <Text
                                selectable={true}
                                style={[styles.elementTextStyle]}>
                                {ayat}
                              </Text>
                              <Text style={[styles.indexTextStyle]}>
                                &#xFD3F;
                                {element.surah_number === 1
                                  ? index + 2
                                  : index + 1}{' '}
                                &#xFD3E;
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
      </View>
    </View>
  );
};

export default ParaDetailScreen;
