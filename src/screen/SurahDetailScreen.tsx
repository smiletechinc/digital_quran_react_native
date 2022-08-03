import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, Image} from 'react-native';
import {styles} from './index';
import {MushafButton} from '../components/buttons/index';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {VerseContext, QuranContextType} from '../context/quranContext';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {roundAyahSVG} from '../constants/images';
const MushafImage = require('../resources/images/MushafMode.png');

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {surahObject} = React.useContext(SurahContext) as SurahContextType;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {navigation, route, reduxVerses, updated} = props;
  const [surahData, setSurahData] = useState<Object[]>();
  const [bismillahAyah, setBismillahAyah] = useState();
  const [mushafState, setMushafState] = useState<boolean>(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);

  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    if (selectedIndexValue === 1) {
      setMushafState(false);
    } else {
      setMushafState(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#57BBC1',
      },
      title: `${Object.values(surahObject)[4]}`,
    });

    versesObject.forEach((element: any) => {
      if (Object.values(surahObject)[5] === element.index) {
        setSurahData(Object.values(element.verse));
      }
    });
    console.log('suraHObject', surahData);
  }, [navigation, mushafState]);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.itemContainer}>
        {/* <Text style={styles.itemText}>{item}</Text> */}
        <View>
          <Image source={roundAyahSVG} style={{width: 32, height: 32}} />
        </View>
        {/* <Text style={{right: 16}}>{index}</Text> */}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {
          backgroundColor: '#57BBC1',
          marginTop: 48,
        },
      ]}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0)',
          borderRadius: 48,
        }}>
        <SegmentedControlTab
          values={['Musuaf', 'Translation']}
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
          <View style={styles.readingcontainer}>
            <FlatList
              style={styles.listContainer}
              data={surahData}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.mushafView}>
              {surahData &&
                surahData.map((element, index) => {
                  if (index > 0) {
                    return (
                      <View style={styles.nestedText}>
                        <View>
                          <Text style={styles.elementTextStyle}>{element}</Text>
                        </View>
                        <View style={styles.indexViewStyle}>
                          <Text style={styles.indexTextStyle}>{index}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default SurahScreen;
