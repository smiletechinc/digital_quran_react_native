export interface bookmarkVerseContextType {
  favoriteVerses: any;
  isBooked: boolean;
}

export type BookmarkVerseContextType = {
  favoriteVerses: any;
  isBookmarked: boolean;
  setFavoriteVerses: (setVerse: any) => void;
  addInVerseBook: (favouriteVerseObj: any) => void;
  checkBookmarked: (favouriteVerseObj: any) => boolean;
  removeInVerseBook: (favouriteVerseObj: any) => void;
};

import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export const BookmarkVerseContext =
  React.createContext<BookmarkVerseContextType | null>(null);

const BookmarkVerseContextProvider = ({children}: any) => {
  const [favoriteVerses, setFavoriteVerses] = React.useState([]);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  useEffect(() => {
    try {
      AsyncStorage.getItem('QURAN_APP::FAVOURITE_AYATS').then(value => {
        console.log('value in async', value);
        if (value) {
          setFavoriteVerses(JSON.parse(value));
        }
      });
    } catch (e) {
      // error reading value
    }
  }, []);

  useEffect(() => {
    console.log('hiaksdjlsa', favoriteVerses);
    if (favoriteVerses != null || favoriteVerses != undefined) {
      console.log('value in JSON', JSON.stringify(favoriteVerses));
      let valueStoredStorage = JSON.stringify(favoriteVerses);
      try {
        AsyncStorage.setItem(
          'QURAN_APP::FAVOURITE_AYATS',
          `${valueStoredStorage}`,
        );
      } catch (error) {
        console.log('Data not Persist in context', error);
      }
    }
  }, [favoriteVerses]);

  const addInVerseBook = (favouriteVerseObject: any) => {
    let favoriteVerses_: any = [];
    favoriteVerses.forEach(verse => {
      favoriteVerses_.push(verse);
    });
    favoriteVerses_.push(favouriteVerseObject);
    setFavoriteVerses(favoriteVerses_);
  };

  const removeInVerseBook = (favouriteVerseObject: any) => {
    const index = favoriteVerses.findIndex(
      (element: any) =>
        element.surahNumber === favouriteVerseObject.surahNumber &&
        element.ayatNumber === favouriteVerseObject.ayatNumber,
    );
    console.log('element', index);
    favoriteVerses.splice(index, 1);
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
    console.log('res', res);
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
        addInVerseBook,
        checkBookmarked,
        removeInVerseBook,
      }}>
      {children}
    </BookmarkVerseContext.Provider>
  );
};

export default BookmarkVerseContextProvider;
