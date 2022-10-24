import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const addFavVerse = (favVerse: FavVerseMeta) => {
  return {
    type: actionTypes.ADD_FAV,
    favVerse,
  };
};
