import React, {useEffect, useState, useRef} from 'react';
import {View, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './index';
import {clearSearchBar, searchIcon} from '../constants/images';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {debounce} from 'lodash';
import {SearchList} from '../components/List/index';
import {ClipboardHook} from '../hooks/clipboardHook';
import Toast from 'react-native-fast-toast';

type Props = {
  navigation: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [textValue, setChangeText] = React.useState('');
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [clicked, setClicked] = React.useState(false);
  const toast = useRef(null);
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show('Copy to Clipboard', {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  const LogFunc = () => {
    navigation.replace('HomeScreen');
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
      setCharacters(ayatArr);
    } else {
      setCharacters([]);
    }
  };
  const handleChange = async (e: string) => {
    setChangeText(e);
    setClicked(true);
    console.log('clicked', clicked);
    var debounce_fun = await debounce(() => search(e), 3000);
    debounce_fun();
  };

  const renderItem = ({item}: any) => {
    return (
      <SearchList surah={item} onPress={() => copyToClipboard(item.ayatText)} />
    );
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 120},
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
            placeholder="Search here"
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

      <FlatList
        style={styles.listContainer}
        data={characters}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchingScreen;
