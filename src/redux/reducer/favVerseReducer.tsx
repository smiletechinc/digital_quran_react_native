import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: FavVerseState = {
  favVerses: [],
};

const paraReducer = (
  state: FavVerseState = initialState,
  action: AnyAction,
): FavVerseState => {
  switch (action.type) {
    case actionTypes.ADD_FAV:
      return {
        ...state,
        favVerses: state.favVerses.concat(action.favVerse),
      };
    default:
      return state;
  }
};

export default paraReducer;
