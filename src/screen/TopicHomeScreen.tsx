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
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
import {favEmptyStateImage} from '../constants/images';
import {useTranslation} from 'react-i18next';
import {deleteFavBook} from '../redux/action/favVerseAction';
import {InternetCheckedHook} from '../hooks/internetHook';

type Props = {
  navigation: any;
  updated: boolean;
  reduxFavouriteVerse: any;
  deleteFavBook: any;
};

let updatedOuter = false;

const TopicsScreen: React.FunctionComponent<Props> = props => {
  const {navigation, reduxFavouriteVerse, deleteFavBook} = props;
  const {t} = useTranslation();
  const {favoriteVerses, removeInVerseBook, favoriteSurahs, removeInSurahBook} =
    React.useContext(BookmarkVerseContext) as BookmarkVerseContextType;
  const {setSurahObject} = React.useContext(SurahContext) as SurahContextType;
  const [favouirteVerseData, setFavouriteVersesData] = useState([]);
  const [favouirteSurahsData, setFavouriteSurahsData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInternet, setIsInternet] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [surahState, setSurahState] = useState<boolean>(true);
  const {removeBookmark} = FirebaseDataHook();
  const {internetCheckFunction, internetConditionCheck} = InternetCheckedHook();

  useEffect(() => {
    setFavouriteVersesData(reduxFavouriteVerse);
    if (internetConditionCheck) {
      setIsInternet(true);
    }
  }, [selectedIndexValue, internetConditionCheck]);

  useEffect(() => {
    if (favoriteVerses || favoriteSurahs) {
      setFavouriteSurahsData(favoriteSurahs);
      setIsFavorite(false);
    }
  }, [favoriteVerses, isFavorite, favoriteSurahs]);

  const favFunctionCalled = (item: any) => {
    if (!surahState) {
      removeBookmark(item.id);
    } else {
      removeInSurahBook(Number(item.index));
      setIsFavorite(true);
    }
  };

  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    internetCheckFunction();
    selectedIndexValue === 0 ? setSurahState(false) : setSurahState(true);
  };

  const moveFunction = (surahdata: any) => {
    if (surahState) {
      setSurahObject(surahdata);
      navigation.navigate('SurahScreen');
    } else {
      navigation.navigate('AyahList', {surahdata});
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <BookmarkListItem
        ayaObject={item}
        itemIndex={index}
        onPress={() => {
          favFunctionCalled(item);
        }}
        isSurah={surahState ? true : false}
        onSurahTouchEnd={() => {
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
            values={[`${t('surah')}`, `${t('AyahList')}`]}
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
            {isInternet && favouirteVerseData?.length > 0 ? (
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
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: {type: string; ayatID?: String}) => void,
) => {
  return {
    deleteFavBook: (deleteFavBookData: String) => {
      dispatch(deleteFavBook(deleteFavBookData));
    },
  };
};

const mapStateToProps = (state: {bookMarkVerses: {favBooks: any}}) => {
  console.log('redux form list', state.bookMarkVerses.favBooks);
  return {
    reduxFavouriteVerse: state.bookMarkVerses.favBooks,
    updated: !updatedOuter,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopicsScreen);
