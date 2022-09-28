import React, {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {VerseContext, QuranContextType} from '../context/quranContext';

interface Props {
  arabictext: any;
}

export const SearchAyahHook = () => {
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [startAnimation, setStartAnimation] = useState(false);

  const searchVerse = async (ayahCriteria: any) => {
    try {
      if (ayahCriteria != '') {
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
        setStartAnimation(false);
        setCharacters(ayatArr);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    searchVerse,
    startAnimation,
    setStartAnimation,
    characters,
    setCharacters,
  };
};
