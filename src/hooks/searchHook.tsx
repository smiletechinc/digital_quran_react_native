import React, {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {SearchContext, SearchContextType} from '../context/searchContext';
import {debounce} from 'lodash';
import {Alert} from 'react-native';

interface Props {
  arabictext: any;
}
var stringSimilarity = require('string-similarity');

export const SearchAyahHook = () => {
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const {
    setCharacters,
    setStartAnimation,
    // addSearchTextCharacter,
    setChangeText,
    setClicked,
    setSearchDataFileInSearch,
  } = React.useContext(SearchContext) as SearchContextType;
  // const [characters, setCharacters] = React.useState<any[]>([]);
  // const [startAnimation, setStartAnimation] = useState(false);
  // const [searchDatainFIle, setSearchDataFileInSearch] = useState(false);
  let ayatArr: any = [];

  const ayatFind = async (ayatSearchText: string) => {
    await Promise.all(
      versesObject.map((verseObject: any, surahIndex: number) => {
        Object.values(verseObject.verse).filter(
          (ayat: any, ayatIndex: number) => {
            if (
              JSON.stringify(ayat)
                .replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g, '')
                .includes(
                  JSON.stringify(ayatSearchText).replace(
                    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g,
                    '',
                  ),
                )
            ) {
              var res = ayatArr.find((ayatverse: {ayatText: any}) => {
                return ayatverse.ayatText === ayat;
              });
              // console.log('response', res);
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
  };

  const stringSplitFunc = (textString: string) => {
    var s = textString;
    console.log('s', s);
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf(' ', middle);
    console.log('before', before);
    var after = s.indexOf(' ', middle + 1);
    console.log('after', after);
    console.log('middle', middle);
    if (middle - before < after - middle) {
      middle = before;
    } else {
      middle = after;
    }
    console.log('middle1', middle);
    var s1 = s.substring(0, middle);
    console.log('s1', s1);
    return s1;
  };

  const searchInAdvanced = (ayahSearchAdvanced: any) => {
    setStartAnimation(true);
    var searchAgain = false;
    // var halfString = stringSplitFunc(JSON.stringify(ayahCriteria));
    var textSplit = ayahSearchAdvanced;
    var i = 0;
    do {
      console.log('i', i);
      textSplit = stringSplitFunc(JSON.stringify(textSplit));
      if (textSplit.length > 0) {
        console.log('searchAgain', searchAgain);
        ayatFind(textSplit);
        if (ayatArr.length > 0) {
          console.log('searchAgain1', searchAgain);
          searchAgain = true;
        }
        i++;
      } else {
        console.log('searchAgain2', searchAgain);
        searchAgain = false;
        break;
      }
    } while (!searchAgain);

    if (searchAgain) {
      setStartAnimation(false);
      // addSearchTextCharacter(ayatArr);
    } else {
      setStartAnimation(false);
      setSearchDataFileInSearch(true);
      console.log('', ayatArr);
    }
  };

  const searchVerse = async (ayahCriteria: any) => {
    // try {
    //   if (ayahCriteria != '') {
    //     ayatFind(ayahCriteria);
    //     if (ayatArr.length > 0) {
    //       setStartAnimation(false);
    //       // addSearchTextCharacter(ayatArr);
    //     } else {
    //       setStartAnimation(false);
    //       setSearchDataFileInSearch(true);
    //       console.log('', ayatArr);
    //     }
    //   } else {
    //     setCharacters([]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setCharacters([]);
    if (ayahCriteria != '') {
      let ayatArr: any = [];
      let count = 0;
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
                    JSON.stringify(ayahCriteria).replace(
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
      console.log('ayatArr', ayahCriteria, ayatArr);
      if (ayatArr.length > 0) {
        setStartAnimation(false);
        setCharacters(ayatArr);
      } else {
        setStartAnimation(false);
        setSearchDataFileInSearch(true);
      }
    } else {
      setCharacters([]);
      setStartAnimation(false);
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
