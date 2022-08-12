import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles} from './index';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {VerseContext, QuranContextType} from '../context/quranContext';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useTranslation} from 'react-i18next';
import bismillah from '../resources/bismillah.json';
import {SurahDetailList} from '../components/List/index';
import HeaderDetail from '../components/Header/headerDetail';
import MusufView from '../components/musuafView';

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {surahObject} = React.useContext(SurahContext) as SurahContextType;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {navigation} = props;
  const [surahData, setSurahData] = useState<Object[]>();
  const [surahTitle, setSurahTitle] = useState<Object[]>();
  const [surahVerseCount, setSurahVerseCount] = useState<number>();
  const [bismillahAyah, setBismillahAyah] = useState<Object[]>();
  const [mushafState, setMushafState] = useState<boolean>(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [isSurahFatiha, setIsSurahFathia] = useState(false);
  const [isSurahToba, setIsSurahToba] = useState(true);
  const {t} = useTranslation();
  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    if (selectedIndexValue === 1) {
      setMushafState(false);
    } else {
      setMushafState(true);
    }
  };

  useEffect(() => {
    versesObject.forEach((element: any) => {
      if (Object.values(surahObject)[5] === element.index) {
        setSurahData(Object.values(element.verse));
        setSurahVerseCount(element.count);
      }
    });
    setSurahTitle(t(Object.values(surahObject)[3]));
    setBismillahAyah(Object.values(bismillah[0]));
    Object.values(surahObject)[5] === '001'
      ? setIsSurahFathia(true)
      : setIsSurahFathia(false);
    Object.values(surahObject)[5] === '009'
      ? setIsSurahToba(false)
      : setIsSurahToba(true);
  }, [navigation]);

  const renderItem = ({item, index}: any) => {
    return (
      <SurahDetailList
        verse={item}
        index={index}
        isSurahFathia={isSurahFatiha}
      />
    );
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {
          backgroundColor: '#57BBC1',
        },
      ]}>
      <HeaderDetail
        surahTitle={surahTitle}
        surahVerseCount={surahVerseCount}
        navigation={navigation}
      />
      <View style={styles.segementedView}>
        <SegmentedControlTab
          values={['Surah', 'Ayat']}
          selectedIndex={selectedIndexValue}
          onTabPress={value => MushafNavigation(value)}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          borderRadius={24}
        />
      </View>
      <View>
        {mushafState ? (
          <View>
            {isSurahToba && (
              <View style={styles.bismillahView}>
                <Text style={styles.bismillahText}>{bismillahAyah}</Text>
                <Text style={[styles.indexTextStyle]}>
                  &#xFD3E;{isSurahFatiha ? 1 : 0} &#xFD3F;
                </Text>
              </View>
            )}
            <View style={styles.readingcontainer}>
              <FlatList
                style={styles.listContainer}
                data={surahData}
                renderItem={renderItem}
              />
            </View>
          </View>
        ) : (
          <MusufView
            isSurahFatiha={isSurahFatiha}
            isSurahToba={isSurahToba}
            surahData={surahData}
            bismillahAyah={bismillahAyah}
          />
        )}
      </View>
    </View>
  );
};

export default SurahScreen;
