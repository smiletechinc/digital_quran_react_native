export interface bookmarkVerseContextType {
  favoriteVerses: any;
  isBooked: boolean;
}

export type BookmarkVerseContextType = {
  favoriteVerses: any;
  favoriteSurahs: any;
  isBookmarked: boolean;
  isUpdatedAyat: boolean;
  setIsUpdatedAyat: (value: boolean) => void;
  setFavoriteVerses: (setVerse: any) => void;
  addInVerseBook: (favouriteVerseObj: any) => void;
  addInSurahBook: (favouriteSurahObj: any) => void;
  bookVerseValues: (favouriteVerse: any) => void;
  updateVerseBookLibrary: (libraryData: any, id: string) => void;
  checkSurahBookmarked: (favouriteSurahObj: any) => boolean;
  removeInVerseBook: (favouriteVerseObj: any) => void;
  removeInSurahBook: (surahIndex: number) => void;
};

import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {AnyMap} from 'immer/dist/internal';

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
      AsyncStorage.getItem('QURAN_APP::FAVOURITE_SURAHS').then(value => {
        if (value) {
          setFavoriteSurahs(JSON.parse(value));
        }
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
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
    console.log('value', favouriteVerseObject);
    let favoriteVerses_: any = [];
    favoriteVerses.forEach(verse => {
      favoriteVerses_.push(verse);
    });
    favoriteVerses_.push(favouriteVerseObject);
    setFavoriteVerses(favoriteVerses_);
    // setIsUpdatedAyat(true);
  };

  const bookVerseValues = (favoriteBooks: any) => {
    setFavoriteVerses(favoriteBooks);
  };
  const addInSurahBook = (favoriteSurahObject: any) => {
    let favoriteSurah_: any = [];
    favoriteSurahs.forEach(surah => {
      favoriteSurah_.push(surah);
    });
    favoriteSurah_.push(favoriteSurahObject);
    setFavoriteSurahs(favoriteSurah_);
    setIsUpdatedSurah(true);
  };

  const removeInVerseBook = (favouriteVerseObject: any) => {
    // setIsUpdatedAyat(false);
    const index = favoriteVerses.findIndex((element: any) => {
      return element.id === favouriteVerseObject;
    });
    console.log('itemC', index);
    favoriteVerses.splice(index, 1);
    setIsUpdatedAyat(true);
  };

  const removeInSurahBook = (surahIndex: number) => {
    const index = favoriteSurahs.findIndex((element: any) => {
      return Number(element.index) === surahIndex;
    });
    favoriteSurahs.splice(index, 1);
    setIsUpdatedSurah(true);
  };

  const checkSurahBookmarked = (surahIndex: number) => {
    var res = favoriteSurahs.find((surahBook: any) => {
      return Number(surahBook.index) === surahIndex;
    });
    let isTrue = false;
    res ? (isTrue = true) : (isTrue = false);
    return isTrue;
  };

  const updateVerseBookLibrary = (libraryaUpdate: any, bookId: string) => {
    favoriteVerses.map(
      (element: {id: string; name: string; libraryData: any}) => {
        if (element.id === bookId) {
          console.log('eleme', element);
          element.libraryData = libraryaUpdate;
        }
      },
    );
    console.log('after updation favoriteVerse', favoriteVerses);
  };

  return (
    <BookmarkVerseContext.Provider
      value={{
        setFavoriteVerses,
        isBookmarked,
        favoriteVerses,
        favoriteSurahs,
        isUpdatedAyat,
        setIsUpdatedAyat,
        bookVerseValues,
        addInSurahBook,
        addInVerseBook,
        checkSurahBookmarked,
        updateVerseBookLibrary,
        // checkBookmarked,
        removeInVerseBook,
        removeInSurahBook,
      }}>
      {children}
    </BookmarkVerseContext.Provider>
  );
};

export default BookmarkVerseContextProvider;
