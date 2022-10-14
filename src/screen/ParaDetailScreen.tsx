import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import {styles} from './index';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import HeaderDetail from '../components/Header/headerDetail';
import {SurahDetailHook} from '../hooks/surahDetailHook';
import bismillah from '../resources/bismillah.json';
import {useTranslation} from 'react-i18next';
import {SCREEN_WIDTH} from '../constants/index';

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
  const {t} = useTranslation();
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
        surahTitle={paraObject.title}
        surahVerseCount={Object.values(paraObject.titleArabic)}
        navigation={navigation}
        fromSurah={false}
      />
      <View
        style={[
          styles.mushafView,
          {
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: 16,
            marginBottom: '30%',
            zIndex: 20,
          },
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {paraDataDisplay &&
            paraDataDisplay.map((element, index) => {
              let paraSurha = element.surah_name;
              let paraVerse = element.verses;
              return (
                <View
                  style={{
                    marginBottom: '8%',
                  }}>
                  <View>
                    <View style={styles.paraSurahTitleView}>
                      <Text style={styles.paraSurahTitleText}>{paraSurha}</Text>
                    </View>
                    {element.surah_number !== 9 && (
                      <View style={styles.bismillahView}>
                        <Text style={styles.bismillahText}>
                          {bismillahAyah}
                        </Text>
                        {element.surah_number === 1 && (
                          <Text style={[styles.indexTextStyle]}>
                            &#xFD3E;{t(`${1}`)} &#xFD3F;
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 4,
                    }}>
                    <Text style={{}}>
                      {paraVerse &&
                        paraVerse.map((ayat: any, index: number) => {
                          index = element.surahfirstayatindex + index;
                          return (
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
                                  ? t(`${index + 2}`)
                                  : t(`${index + 1}`)}
                                &#xFD3E;
                              </Text>
                            </Text>
                          );
                        })}
                    </Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ParaDetailScreen;
