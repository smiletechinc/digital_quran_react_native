import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Text, View, FlatList, ScrollView, Alert} from 'react-native';
import {styles} from './index';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {SurahDetailList} from '../components/List/index';
import HeaderDetail from '../components/Header/headerDetail';
import MusufView from '../components/musuafView';
import {SurahDetailHook} from '../hooks/surahDetailHook';
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
import {ClipboardHook} from '../hooks/clipboardHook';
import Toast from 'react-native-fast-toast';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';
import {useTranslation} from 'react-i18next';
import BookmarkModel from '../model/bookmarkOptionModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

const SurahScreen: React.FunctionComponent<Props> = props => {
  const {t} = useTranslation();
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const {addAyatInBookmark, getAyahId, fetchAyahObjectID} = FirebaseDataHook();
  const toast: any = useRef(null);
  const {navigation} = props;
  const [mushafState, setMushafState] = useState<boolean>(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(0);
  const [verseString, setVerseString] = useState('');
  const netInfo = useNetInfo();

  const {
    surahDetaillMake,
    surahData,
    surahVerseCount,
    surahTitle,
    bismillahAyah,
    isSurahFatiha,
    surahIndex,
    isSurahToba,
    surahTitleArabic,
    surahObject,
  } = SurahDetailHook();
  const refRBSheet: any = useRef();
  const userCreatedId = useSelector(
    (state: {userObject: {authUser: any}}) => state.userObject.authUser.id,
  );
  const {
    addInVerseBook,
    // checkBookmarked,
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

  useEffect(() => {
    surahDetaillMake();
  }, [navigation]);

  const MushafNavigation = (value: any) => {
    setSelectedIndexValue(value);
    selectedIndexValue === 1 ? setMushafState(false) : setMushafState(true);
  };

  const favFunctionCalled = (verseSelect: string, verseNumber: Number) => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      getAyahId(verseSelect);
      refRBSheet.current.open();
    } else {
      Alert.alert(
        'No Internet',
        'This Feature is available when device is connected with Internet',
      );
    }
  };

  const createFunction = (libraryName: string) => {
    addAyatInBookmark(
      [Object.keys(fetchAyahObjectID)[0]],
      libraryName,
      userCreatedId,
    );
    refRBSheet.current.close();
  };

  const doneFunction = () => {
    refRBSheet.current.close();
    Alert.alert('Saved');
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
            }}
            showsVerticalScrollIndicator={false}>
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
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <BookmarkModel
          onCreateButton={createFunction}
          onCancelButtonFunc={() => refRBSheet.current.close()}
          ayatId={Object.keys(fetchAyahObjectID)[0]}
          onDoneButton={doneFunction}
          userId={userCreatedId}
        />
      </RBSheet>
    </View>
  );
};

export default SurahScreen;
