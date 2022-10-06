import React, {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {SearchContext, SearchContextType} from '../context/searchContext';
import {debounce} from 'lodash';

interface Props {
  arabictext: any;
}

export const SearchAyahHook = () => {
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {
    setCharacters,
    setStartAnimation,
    setChangeText,
    setClicked,
    setSearchDataFileInSearch,
  } = React.useContext(SearchContext) as SearchContextType;
  const [searchAgainFunction, setSearchAgainFunction] = useState(false);

  const ayatReturnFunction = (ayatObject: []) => {
    if (ayatObject.length > 0) {
      setSearchAgainFunction(false);
      setStartAnimation(false);
      setCharacters(ayatObject);
    } else {
      if (!searchAgainFunction) {
        setStartAnimation(false);
        setSearchDataFileInSearch(true);
      }
    }
  };

  const ayatFind = async (ayatSearchText: string) => {
    let ayatArr: any = [];
    await Promise.all(
      versesObject.map((verseObject: any, surahIndex: number) => {
        Object.values(verseObject.verse).filter(
          (ayat: any, ayatIndex: number) => {
            if (
              JSON.stringify(ayat)
                .replace(
                  /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z])/g,
                  '',
                )
                .includes(
                  JSON.stringify(ayatSearchText).replace(
                    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z])/g,
                    '',
                  ),
                )
            ) {
              var res = ayatArr.find((ayatverse: {ayatText: any}) => {
                return ayatverse.ayatText === ayat;
              });
              if (res) {
                return;
              } else {
                let verseSearchObj = {
                  surahNumber: Number(verseObject.index),
                  surhaName: Number(verseObject.index),
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
    ayatReturnFunction(ayatArr);
  };

  const stringSplitFunc = (textString: string) => {
    var s = textString;
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf(' ', middle);
    var after = s.indexOf(' ', middle + 1);
    if (middle - before < after - middle) {
      middle = before;
    } else {
      middle = after;
    }
    var s1 = s.substring(0, middle);
    return s1;
  };

  const searchInAdvanced = (ayahSearchAdvanced: any) => {
    setSearchDataFileInSearch(false);
    setStartAnimation(true);
    setSearchAgainFunction(true);
    var textSplit = '';
    do {
      textSplit = stringSplitFunc(JSON.stringify(ayahSearchAdvanced));
      if (textSplit.length > 0) {
        console.log('textSplit', textSplit);
        console.log('searchAgainFunction', searchAgainFunction);
        ayatFind(textSplit);
      } else {
        setSearchAgainFunction(false);
        break;
      }
    } while (searchAgainFunction);
  };

  const searchVerse = async (ayahCriteria: any) => {
    try {
      setCharacters([]);
      if (ayahCriteria != '') {
        ayatFind(ayahCriteria);
      } else {
        setCharacters([]);
        setStartAnimation(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e: string) => {
    if (e != '') {
      setClicked(true);
      setChangeText(e);
      setStartAnimation(true);
      setSearchDataFileInSearch(false);
      var debounce_fun = await debounce(() => searchVerse(e), 3000);
      debounce_fun();
    } else {
      setClicked(false);
      setChangeText('');
      setSearchDataFileInSearch(false);
    }
  };

  return {
    searchVerse,
    handleChange,
    searchInAdvanced,
  };
};
