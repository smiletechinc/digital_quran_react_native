import React, {useCallback, useEffect, useState} from 'react';
import {ParaContext, ParaContextType} from '../context/paraContext';

interface Props {
  arabictext: any;
}

export const ParaMakeHook = () => {
  const {addPara} = React.useContext(ParaContext) as ParaContextType;
  const makePara = async (
    paraVerses: any,
    paraMetaObject: any,
    paraSurahs: any,
  ) => {
    try {
      let allSurah: any = [];
      Object.values(paraVerses).forEach(surahAyat => {
        allSurah.push(surahAyat);
      });

      var arrayParaIndex: any = [];
      Object.values(paraMetaObject).forEach((para: any) => {
        arrayParaIndex.push(para.paraIndex);
      });

      let allPara: any = [];
      for (
        let currentParaIndex = 0;
        currentParaIndex < 30;
        currentParaIndex++
      ) {
        var currentParah: any = [];

        let paraFirstSurahNumber = Number(
          paraMetaObject[currentParaIndex].ayahOfSurah[0].firstAyah.surahIndex,
        );

        let paraFirstSurahIndex = paraFirstSurahNumber - 1;
        let paraLastSurahNumber = Number(
          paraMetaObject[currentParaIndex].ayahOfSurah[
            paraMetaObject[currentParaIndex].ayahOfSurah.length - 1
          ].lastAyah.surahIndex,
        );
        let paraLastSurahIndex = paraLastSurahNumber - 1;
        let lastParaSurahVerseIndex = Number(
          paraMetaObject[currentParaIndex].ayahOfSurah[
            paraMetaObject[currentParaIndex].ayahOfSurah.length - 1
          ].lastAyah.ayahIndex.split('_')[1],
        );
        let startValue = 0;
        for (
          let currentSuahIndex = paraFirstSurahIndex;
          currentSuahIndex <= paraLastSurahIndex;
          currentSuahIndex++
        ) {
          let currentSurahAyats = Object.values(
            allSurah[currentSuahIndex].verse,
          );

          let currentVerses: any = [];

          let firstSurahVerseIndex = Number(
            paraMetaObject[currentParaIndex].ayahOfSurah[
              startValue
            ].firstAyah.ayahIndex.split('_')[1] - 1,
          );

          startValue = startValue + 1;

          for (
            let i = firstSurahVerseIndex;
            i < currentSurahAyats.length;
            i++
          ) {
            if (
              i >= lastParaSurahVerseIndex &&
              paraLastSurahIndex === currentSuahIndex
            )
              break;
            else {
              currentVerses.push(currentSurahAyats[i]);
            }
          }
          let currentSurah = {
            surah_number: currentSuahIndex + 1,
            surah_name: paraSurahs[currentSuahIndex].titleArabic,
            verses: currentVerses,
            surahfirstayatindex: firstSurahVerseIndex,
          };

          currentParah.push(currentSurah);
        }
        let para = {
          para_number: currentParaIndex + 1,
          paraDetail: currentParah,
        };

        allPara.push(para);
      }
      addPara(allPara);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    makePara,
  };
};
