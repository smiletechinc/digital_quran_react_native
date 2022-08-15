import React, {useCallback, useEffect, useState} from 'react';
// import Clipboard from "@react-native-clipboard/clipboard";
import {VerseContext, QuranContextType} from '../context/quranContext';
import {SurahContext, SurahContextType} from '../context/surahContext';
import bismillah from '../resources/bismillah.json';
import {useTranslation} from 'react-i18next';

interface Props {
  arabictext: any;
}

export const SurahDetailHook = () => {
  const {t} = useTranslation();
  const {surahObject, setSurahObject} = React.useContext(
    SurahContext,
  ) as SurahContextType;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [surahData, setSurahData] = useState<Object[]>();
  const [surahVerseCount, setSurahVerseCount] = useState<number>();
  const [surahTitle, setSurahTitle] = useState<Object[]>();
  const [bismillahAyah, setBismillahAyah] = useState<Object[]>();
  const [isSurahFatiha, setIsSurahFathia] = useState(false);
  const [isSurahToba, setIsSurahToba] = useState(true);

  const surahDetaillMake = async () => {
    try {
      versesObject.forEach((element: any) => {
        if (Object.values(surahObject)[5] === element.index) {
          setSurahData(Object.values(element.verse));
          setSurahVerseCount(element.count);
        }
      });
      setSurahTitle(t(Object.values(surahObject)[3]));
      setBismillahAyah(Object.values(bismillah[0]));
      Object.values(surahObject)[5] === '001'
        ? setIsSurahFathia(true)
        : setIsSurahFathia(false);
      Object.values(surahObject)[5] === '009'
        ? setIsSurahToba(false)
        : setIsSurahToba(true);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    surahDetaillMake,
    surahData,
    surahVerseCount,
    surahTitle,
    bismillahAyah,
    isSurahFatiha,
    isSurahToba,
  };
};
