import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, FlatList, Text} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import {BookmarkListItem} from '../components/List';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import EmptyState from '../components/emptyState';
import {SurahContext, SurahContextType} from '../context/surahContext';

type Props = {
  navigation: any;
  updated: boolean;
  reduxFavouriteVerse: any;
};

let updatedOuter = false;

const TopicsScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {favoriteVerses, removeInVerseBook, favoriteSurahs, removeInSurahBook} =
    React.useContext(BookmarkVerseContext) as BookmarkVerseContextType;
  const {surahObject, setSurahObject} = React.useContext(
    SurahContext,
  ) as SurahContextType;
  const [favouirteVerseData, setFavouriteVersesData] = useState([]);
  const [favouirteSurahsData, setFavouriteSurahsData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [surahState, setSurahState] = useState<boolean>(true);
  const [lisDataObject, setListDataObject] = useState([]);

  useEffect(() => {
    if (favoriteVerses || favoriteSurahs) {
      setFavouriteSurahsData(favoriteSurahs);
      setFavouriteVersesData(favoriteVerses);
      setIsFavorite(false);
    }
  }, [favoriteVerses, isFavorite, favoriteSurahs]);

  useEffect(() => {
    setListDataObject(surahState ? favouirteSurahsData : favouirteVerseData);
  });
  const favFunctionCalled = (item: any) => {
    if (!surahState) {
      var bookVerse = {
        surahNumber: item.surahNumber,
        ayatNumber: item.ayatNumber,
        ayatText: item.ayatText,
      };
      removeInVerseBook(bookVerse);
      setIsFavorite(true);
    } else {
      removeInSurahBook(Number(item.index));
      setIsFavorite(true);
    }
  };

  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    selectedIndexValue === 0 ? setSurahState(false) : setSurahState(true);
  };

  const moveFunction = (surahdata: any) => {
    setSurahObject(surahdata);
    navigation.navigate('SurahScreen');
  };

  const renderItem = ({item}: any) => {
    return (
      <BookmarkListItem
        ayaObject={item}
        isSurah={surahState ? true : false}
        onPress={() => {
          favFunctionCalled(item);
        }}
        onTouchEnd={() => {
          moveFunction(item);
        }}
      />
    );
  };

  const LogFunc = () => {
    navigation.navigate('Surah');
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 68},
      ]}>
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
      {lisDataObject.length > 0 ? (
        <FlatList
          style={[styles.listContainer]}
          data={lisDataObject}
          renderItem={renderItem}
        />
      ) : (
        <EmptyState
          buttonTitle={'Read Quran'}
          onPress={LogFunc}
          surahStateValue={surahState}
        />
      )}
    </View>
  );
};
const mapStateToProps = (state: {bookMarkVerses: {favVerses: any}}) => {
  return {
    reduxFavouriteVerse: state.bookMarkVerses.favVerses,
    updated: !updatedOuter,
  };
};
export default connect(mapStateToProps, null)(TopicsScreen);
