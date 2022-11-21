import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const deleteFavBook = (bookId: String) => {
  return {
    type: actionTypes.DELETE_FAV_BOOK,
    bookId,
  };
};

// export const addFavBook = (favBook: FavBookMeta) => {
//   return {
//     type: actionTypes.ADD_FAV_BOOK,
//     favBook,
//   };
// };

export const addNewBook = (favBook: FavBookMeta) => {
  return {
    type: actionTypes.ADD_NEW_BOOk,
    favBook,
  };
};

export const updateBook = (favUpdateAyahArray: any, bookId: string) => {
  return {
    type: actionTypes.UPDATE_FAV_BOOK,
    favUpdateAyahArray,
    bookId,
  };
};

export const deleteAyahBook = (bookId: string, favDeleteAyahArray: any) => {
  return {
    type: actionTypes.DELETE_AYAT_BOOK,
    favDeleteAyahArray,
    bookId,
  };
};
