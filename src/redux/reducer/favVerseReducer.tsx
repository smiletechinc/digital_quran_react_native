import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: FavBookState = {
  favBooks: [],
};

const favReducer = (
  state: FavBookState = initialState,
  action: AnyAction,
): FavBookState => {
  switch (action.type) {
    case actionTypes.ADD_NEW_BOOk:
      return {
        ...state,
        favBooks: state.favBooks.concat(action.favBook),
      };
    case actionTypes.UPDATE_FAV_BOOK:
      return {
        ...state,
        favBooks: state.favBooks.map(element =>
          Object.values(element)[1] === action.bookId
            ? {
                ...element,
                libraryData: action.favUpdateAyahArray,
              }
            : element,
        ),
      };
    case actionTypes.DELETE_FAV_BOOK:
      var updatedArray = state.favBooks.filter(element => {
        return Object.values(element)[1] != action.bookId;
      });
      console.log('array id', updatedArray);
      return {
        ...state,
        favBooks: updatedArray,
      };
    case actionTypes.BOOKS_UPDATE:
      return {
        ...state,
        favBooks: Object.values(action.allFavBooks),
      };
    default:
      return state;
  }
};

export default favReducer;
