import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-fast-toast';
import {t} from 'i18next';
// import {FloatingButton} from '../components/buttons';
import {styles} from './index';
import {ClipboardHook} from '../hooks/clipboardHook';
import EmptyState from '../components/emptyState/index';
// import NoDataFound from '../components/emptyState/noDataFound';
import {searchImage, clearSearchBar, searchIcon} from '../constants/images';
// import {
// SearchBarText,
// SearchBarDisplayResult,
// } from '../components/searchBar/index';
// import {SearchContext, SearchContextType} from '../context/searchContext';
// import SearchHeaderDetail from '../components/Header/searchHeader';
// import {SearchAyahHook} from '../hooks/searchHook';
import {SCREEN_HEIGHT, MULTIPLIER} from '../constants/';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {debounce} from 'lodash';
import {SearchList} from '../components/List/index';
import ContentLoader, {Rect} from 'react-content-loader/native';

type Props = {
  navigation: any;
  route?: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const toast = useRef(null);
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  // const {searchInAdvanced, handleChange, searchDatainFIle} = SearchAyahHook();
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [textValue, setChangeText] = React.useState('');
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [clicked, setClicked] = React.useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show(`${t('copy to clipboard')}`, {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  const LogFunc = () => {
    navigation.navigate('Surah');
  };

  const search = async (criteria: string) => {
    if (criteria != '') {
      let ayatArr: any = [];

      await Promise.all(
        versesObject.map((verseObject: any, surahIndex: number) => {
          Object.values(verseObject.verse).filter(
            (ayat: any, ayatIndex: number) => {
              if (
                JSON.stringify(ayat)
                  .replace(
                    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
                    '',
                  )
                  .includes(
                    JSON.stringify(criteria).replace(
                      /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
                      '',
                    ),
                  )
              ) {
                var res = ayatArr.find((ayatverse: {ayatText: any}) => {
                  return ayatverse.ayatText === ayat;
                });
                console.log('response', res);
                if (res) {
                  return;
                } else {
                  let verseSearchObj = {
                    surahNumber: Number(verseObject.index),
                    surhaName: verseObject.name,
                    ayatNumber: ayatIndex + 1,
                    ayatText: ayat,
                  };
                  ayatArr.push(verseSearchObj);
                }
              }
            },
          );
        }),
      );
      setStartAnimation(false);
      setCharacters(ayatArr);
    } else {
      setCharacters([]);
    }
  };
  const handleChange = async (e: string) => {
    setChangeText(e);
    setClicked(true);
    setStartAnimation(true);
    var debounce_fun = await debounce(() => search(e), 3000);
    debounce_fun();
  };

  const renderItem = ({item}: any) => {
    return (
      <SearchList surah={item} onPress={() => copyToClipboard(item.ayatText)} />
    );
  };

  return (
    <ScrollView>
      <View
        style={[
          styles.selectionContainer,
          {backgroundColor: '#00B4AC', paddingTop: 120, marginBottom: 16},
        ]}>
        <Toast ref={toast} placement="bottom" />
        <View style={styles.searchContainer}>
          <View
            style={
              clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
            }>
            <TextInput
              value={textValue}
              onChangeText={text => handleChange(text)}
              placeholder={t('search here')}
              onFocus={() => {
                setClicked(true);
              }}
              style={styles.inputSearch}
            />
            <Image source={searchIcon} />
          </View>
          {clicked && (
            <TouchableOpacity
              onPress={() => {
                setChangeText(''), setClicked(false), setCharacters([]);
              }}>
              <Image source={clearSearchBar} />
            </TouchableOpacity>
          )}
        </View>
        {characters.length > 0 || clicked ? (
          <View>
            {startAnimation ? (
              <ContentLoader
                speed={1.8}
                backgroundColor={'#ffffff'}
                foregroundColor={'#999'}
                viewBox="0 26 360 70">
                <Rect x="30" y="0" rx="4" ry="8" width="300" height="48" />
                <Rect x="30" y="64" rx="4" ry="4" width="300" height="48" />
                <Rect x="30" y="128" rx="4" ry="4" width="300" height="48" />
                <Rect x="30" y="192" rx="4" ry="4" width="300" height="48" />
                <Rect x="30" y="256" rx="4" ry="4" width="300" height="48" />
              </ContentLoader>
            ) : (
              <FlatList
                style={styles.listContainer}
                data={characters}
                renderItem={renderItem}
              />
            )}
          </View>
        ) : (
          <EmptyState
            buttonTitle={'read quran'}
            searchScreen={true}
            onPress={LogFunc}
            imageDisplay={searchImage}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SearchingScreen;
