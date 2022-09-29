import React, {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {SearchContext, SearchContextType} from '../context/searchContext';
import {debounce} from 'lodash';
import {Alert} from 'react-native';

interface Props {
  arabictext: any;
}

export const SearchAyahHook = () => {
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {
    setCharacters,
    setStartAnimation,
    addSearchTextCharacter,
    setChangeText,
  } = React.useContext(SearchContext) as SearchContextType;
  // const [characters, setCharacters] = React.useState<any[]>([]);
  // const [startAnimation, setStartAnimation] = useState(false);
  const [searchDatainFIle, setSearchDataFileInSearch] = useState(false);

  const searchVerse = async (ayahCriteria: any) => {
    try {
      if (ayahCriteria != '') {
        console.log(
          'ayahCriteria',
          JSON.stringify(ayahCriteria).replace(
            /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g,
            '',
          ),
        );
        let ayatArr: any = [];
        await Promise.all(
          versesObject.map((verseObject: any, surahIndex: number) => {
            Object.values(verseObject.verse).filter(
              (ayat: any, ayatIndex: number) => {
                if (
                  JSON.stringify(ayat)
                    .replace(
                      /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g,
                      '',
                    )
                    .includes(
                      JSON.stringify(ayahCriteria).replace(
                        /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g,
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
        if (ayatArr.length > 0) {
          setStartAnimation(false);
          addSearchTextCharacter(ayatArr);
        } else {
          setSearchDataFileInSearch(true);
          setStartAnimation(false);
          console.log('', ayatArr);
        }
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e: string) => {
    setChangeText(e);
    // clickCheck(true);
    setStartAnimation(true);
    var debounce_fun = await debounce(() => searchVerse(e), 3000);
    debounce_fun();
  };

  return {
    searchVerse,
    handleChange,
    searchDatainFIle,
  };
};
