import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
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
import {favEmptyStateImage} from '../constants/images';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: any;
  updated: boolean;
  reduxFavouriteVerse: any;
};

let updatedOuter = false;

const TopicsScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {favoriteVerses, removeInVerseBook, favoriteSurahs, removeInSurahBook} =
    React.useContext(BookmarkVerseContext) as BookmarkVerseContextType;
  const {setSurahObject} = React.useContext(SurahContext) as SurahContextType;
  const [favouirteVerseData, setFavouriteVersesData] = useState([]);
  const [favouirteSurahsData, setFavouriteSurahsData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [surahState, setSurahState] = useState<boolean>(true);
  const [lisDataObject, setListDataObject] = useState([]);

  useEffect(() => {
    console.log('favoriteVerse', favoriteVerses);
    console.log('favoriteSurah', favoriteSurahs);
    if (favoriteVerses || favoriteSurahs) {
      setFavouriteSurahsData(favoriteSurahs);
      setFavouriteVersesData(favoriteVerses);
      setIsFavorite(false);
    }
  }, [favoriteVerses, isFavorite, favoriteSurahs]);

  useEffect(() => {
    console.log('listObject', lisDataObject);
    if (surahState) {
      setListDataObject(favoriteSurahs);
    } else {
      setListDataObject(favoriteVerses);
    }
    // setListDataObject(surahState ? favouirteSurahsData : favouirteVerseData);
  }, []);

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
        onPress={() => {
          favFunctionCalled(item);
        }}
        isSurah={surahState ? true : false}
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.selectionContainer,
          {backgroundColor: '#00B4AC', paddingTop: 68, marginBottom: 8},
        ]}>
        <View style={styles.segementedView}>
          <SegmentedControlTab
            values={[`${t('surah')}`, `${t('ayat')}`]}
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
        {selectedIndexValue === 0 && (
          <View>
            {favouirteSurahsData?.length > 0 ? (
              <FlatList
                style={[styles.listContainer]}
                data={favouirteSurahsData}
                renderItem={renderItem}
              />
            ) : (
              <EmptyState
                buttonTitle={'read quran'}
                onPress={LogFunc}
                surahStateValue={surahState}
                searchScreen={false}
                imageDisplay={favEmptyStateImage}
              />
            )}
          </View>
        )}
        {selectedIndexValue === 1 && (
          <View>
            {favouirteVerseData?.length > 0 ? (
              <FlatList
                style={[styles.listContainer]}
                data={favouirteVerseData}
                renderItem={renderItem}
              />
            ) : (
              <EmptyState
                buttonTitle={'read quran'}
                onPress={LogFunc}
                surahStateValue={surahState}
                searchScreen={false}
                imageDisplay={favEmptyStateImage}
              />
            )}
          </View>
        )}
        {/* {lisDataObject.length > 0 ? (
          <FlatList
            style={[styles.listContainer]}
            data={lisDataObject}
            renderItem={renderItem}
          />
        ) : (
          <EmptyState
            buttonTitle={'read quran'}
            onPress={LogFunc}
            surahStateValue={surahState}
            searchScreen={false}
            imageDisplay={favEmptyStateImage}
          />
        )} */}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state: {bookMarkVerses: {favVerses: any}}) => {
  return {
    reduxFavouriteVerse: state.bookMarkVerses.favVerses,
    updated: !updatedOuter,
  };
};
export default connect(mapStateToProps, null)(TopicsScreen);
