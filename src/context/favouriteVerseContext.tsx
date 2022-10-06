export interface bookmarkVerseContextType {
  favoriteVerses: any;
  isBooked: boolean;
}

export type BookmarkVerseContextType = {
  favoriteVerses: any;
  favoriteSurahs: any;
  isBookmarked: boolean;
  setFavoriteVerses: (setVerse: any) => void;
  addInVerseBook: (favouriteVerseObj: any) => void;
  addInSurahBook: (favouriteSurahObj: any) => void;
  checkBookmarked: (favouriteVerseObj: any) => boolean;
  checkSurahBookmarked: (favouriteSurahObj: any) => boolean;
  removeInVerseBook: (favouriteVerseObj: any) => void;
  removeInSurahBook: (surahIndex: number) => void;
};

import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export const BookmarkVerseContext =
  React.createContext<BookmarkVerseContextType | null>(null);

const BookmarkVerseContextProvider = ({children}: any) => {
  const [favoriteVerses, setFavoriteVerses] = React.useState([]);
  const [favoriteSurahs, setFavoriteSurahs] = React.useState([]);
  const [isUpdatedAyat, setIsUpdatedAyat] = React.useState(false);
  const [isUpdatedSurah, setIsUpdatedSurah] = React.useState(false);

  let isBookmarked = false;

  useEffect(() => {
    try {
      AsyncStorage.getItem('QURAN_APP::FAVOURITE_AYATS').then(value => {
        console.log('ayah in async ', value);
        if (value) {
          setFavoriteVerses(JSON.parse(value));
        }
      });
      AsyncStorage.getItem('QURAN_APP::FAVOURITE_SURAHS').then(value => {
        console.log('surah in async', value);
        if (value) {
          setFavoriteSurahs(JSON.parse(value));
        }
      });
    } catch (e) {
      // error reading value
    }
  }, []);

  useEffect(() => {
    if (isUpdatedAyat) {
      if (favoriteVerses != null || favoriteVerses != undefined) {
        let valueStoredStorage = JSON.stringify(favoriteVerses);
        try {
          AsyncStorage.setItem(
            'QURAN_APP::FAVOURITE_AYATS',
            `${valueStoredStorage}`,
          );
          setIsUpdatedAyat(false);
        } catch (error) {}
      }
    }
    if (isUpdatedSurah) {
      if (favoriteSurahs != null || favoriteSurahs != undefined) {
        let valueStoredStorage = JSON.stringify(favoriteSurahs);
        try {
          AsyncStorage.setItem(
            'QURAN_APP::FAVOURITE_SURAHS',
            `${valueStoredStorage}`,
          );
          setIsUpdatedSurah(false);
        } catch (error) {}
      }
    }
  }, [isUpdatedAyat, isUpdatedSurah]);

  const addInVerseBook = (favouriteVerseObject: any) => {
    console.log('favortieVerse', favoriteVerses);
    let favoriteVerses_: any = [];
    favoriteVerses.forEach(verse => {
      favoriteVerses_.push(verse);
    });
    favoriteVerses_.push(favouriteVerseObject);
    setFavoriteVerses(favoriteVerses_);
    setIsUpdatedAyat(true);
  };

  const addInSurahBook = (favoriteSurahObject: any) => {
    console.log('favourtie', favoriteSurahs);
    let favoriteSurah_: any = [];
    favoriteSurahs.forEach(surah => {
      favoriteSurah_.push(surah);
    });
    favoriteSurah_.push(favoriteSurahObject);
    setFavoriteSurahs(favoriteSurah_);
    setIsUpdatedSurah(true);
  };

  const removeInVerseBook = (favouriteVerseObject: any) => {
    const index = favoriteVerses.findIndex(
      (element: any) =>
        element.surahNumber === favouriteVerseObject.surahNumber &&
        element.ayatNumber === favouriteVerseObject.ayatNumber,
    );
    favoriteVerses.splice(index, 1);
    setIsUpdatedAyat(true);
  };

  const removeInSurahBook = (surahIndex: number) => {
    const index = favoriteSurahs.findIndex(
      (element: any) => Number(element.surahNumber) === surahIndex,
    );
    favoriteSurahs.splice(index, 1);
    setIsUpdatedSurah(true);
  };

  const checkSurahBookmarked = (surahIndex: number) => {
    // favoriteSurahs.map((element: any) => {
    //   console.log('hi', Number(element.index));
    // });
    var res = favoriteSurahs.find((surahBook: any) => {
      return Number(surahBook.index) === surahIndex;
    });
    console.log('res', res);
    let isTrue = false;
    res ? (isTrue = true) : (isTrue = false);
    return isTrue;
  };

  const checkBookmarked = (favouriteVerseObject: any) => {
    var res = favoriteVerses.find(
      (verseBook: {ayatNumber: any; surahNumber: any}) => {
        return (
          verseBook.ayatNumber === favouriteVerseObject.ayatNumber &&
          verseBook.surahNumber === favouriteVerseObject.surahNumber
        );
      },
    );
    let isTrue = false;
    res ? (isTrue = true) : (isTrue = false);
    return isTrue;
  };

  return (
    <BookmarkVerseContext.Provider
      value={{
        setFavoriteVerses,
        isBookmarked,
        favoriteVerses,
        favoriteSurahs,
        addInSurahBook,
        addInVerseBook,
        checkSurahBookmarked,
        checkBookmarked,
        removeInVerseBook,
        removeInSurahBook,
      }}>
      {children}
    </BookmarkVerseContext.Provider>
  );
};

export default BookmarkVerseContextProvider;
