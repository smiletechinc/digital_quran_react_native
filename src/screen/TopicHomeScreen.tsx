import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useNetInfo} from '@react-native-community/netinfo';

import {styles} from './index';
import EmptyState from '../components/emptyState';
import {BookmarkListItem} from '../components/List';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';
import {favEmptyStateImage} from '../constants/images';
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';

type Props = {
  navigation: any;
  updated: boolean;
};

const TopicsScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {favoriteVerses, favoriteSurahs, removeInSurahBook} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;
  const {setSurahObject} = React.useContext(SurahContext) as SurahContextType;
  const [favouirteVerseData, setFavouriteVersesData] = useState([]);
  const [favouirteSurahsData, setFavouriteSurahsData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [surahState, setSurahState] = useState<boolean>(true);
  const {removeBookmark} = FirebaseDataHook();

  const netInfo = useNetInfo();

  useEffect(() => {
    if (favoriteVerses || favoriteSurahs) {
      setFavouriteSurahsData(favoriteSurahs);
      setFavouriteVersesData(favoriteVerses);
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

  const LogFunc = () => {
    navigation.navigate('Surah');
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
            {favouirteVerseData?.length > 0 &&
            netInfo.isConnected &&
            netInfo.isInternetReachable ? (
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

export default TopicsScreen;
