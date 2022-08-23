import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {styles} from './index';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {SurahDetailList} from '../components/List/index';
import HeaderDetail from '../components/Header/headerDetail';
import MusufView from '../components/musuafView';
import {SurahDetailHook} from '../hooks/surahDetailHook';
import {ClipboardHook} from '../hooks/clipboardHook';
import Toast from 'react-native-fast-toast';
import {connect, useDispatch} from 'react-redux';
import {addFavVerse} from '../redux/action/favVerseAction';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';
import {favIcon, favSelectIcon} from '../constants/images';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
  addFavVerse: any;
};

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {t} = useTranslation();
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const toast = useRef(null);
  const {navigation, addFavVerse} = props;
  const [mushafState, setMushafState] = useState<boolean>(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const {
    surahDetaillMake,
    surahData,
    surahVerseCount,
    surahTitle,
    bismillahAyah,
    isSurahFatiha,
    surahIndex,
    isSurahToba,
    surahObject,
  } = SurahDetailHook();
  const {
    addInVerseBook,
    checkBookmarked,
    removeInVerseBook,
    removeInSurahBook,
    addInSurahBook,
    checkSurahBookmarked,
  } = React.useContext(BookmarkVerseContext) as BookmarkVerseContextType;

  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show(`${t('copy to clipboard')}`, {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    selectedIndexValue === 1 ? setMushafState(false) : setMushafState(true);
  };

  useEffect(() => {
    surahDetaillMake();
  }, [navigation]);

  const favFunctionCalled = (verseSelect: string, verseNumber: Number) => {
    var bookVerse = {
      surahNumber: surahIndex,
      ayatNumber: verseNumber,
      ayatText: verseSelect,
    };

    if (!checkBookmarked(bookVerse)) {
      addInVerseBook(bookVerse);
    } else {
      removeInVerseBook(bookVerse);
    }
  };

  const surahFavFunction = () => {
    if (!checkSurahBookmarked(surahIndex)) {
      addInSurahBook(surahObject);
    } else {
      removeInSurahBook(surahIndex);
    }
  };
  const renderItem = ({item, index}: any) => {
    let indexNumber = isSurahFatiha ? index + 2 : index + 1;
    return (
      <SurahDetailList
        verse={item}
        indexAyat={indexNumber}
        isSurahFathia={isSurahFatiha}
        onPress={() => copyToClipboard(item)}
        favButtonPress={() => favFunctionCalled(item, indexNumber)}
        ayaObject={{
          surahNumber: surahIndex,
          ayatNumber: indexNumber,
          ayatText: item,
        }}
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
        fromSurah={true}
        surahIndex={surahIndex}
        navigation={navigation}
        onPress={() => surahFavFunction()}
      />
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
      <View>
        <Toast ref={toast} placement="top" />
        {mushafState ? (
          <ScrollView
            style={{
              display: 'flex',
              marginBottom: 64,
            }}>
            {isSurahToba && (
              <View
                style={[
                  styles.bismillahView,
                  {backgroundColor: 'rgba(255,255,255,0.34)'},
                ]}>
                <Text style={styles.bismillahText}>{bismillahAyah}</Text>
                {isSurahFatiha && (
                  <Text style={[styles.indexTextStyle]}>
                    &#xFD3E;1 &#xFD3F;
                  </Text>
                )}
              </View>
            )}
            <FlatList
              style={styles.listContainer}
              data={surahData}
              renderItem={renderItem}
            />
          </ScrollView>
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
const mapDispatchToProps = (
  dispatch: (arg0: {type: string; favVerseSelect?: FavVerseMeta}) => void,
) => {
  return {
    addFavVerse: (addFavourite: FavVerseMeta) => {
      dispatch(addFavVerse(addFavourite));
    },
  };
};

export default connect(null, mapDispatchToProps)(SurahScreen);
