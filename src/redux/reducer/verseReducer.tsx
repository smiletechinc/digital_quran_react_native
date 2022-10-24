import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: VerseState = {
  verses: [],
};

const verseReducer = (
  state: VerseState = initialState,
  action: AnyAction,
): VerseState => {
  switch (action.type) {
    case actionTypes.UPDATE_AYATS:
      const newAyat: QuranMeta = action.ayat;
      return {
        ...state,
        verses: state.verses.concat(action.ayat),
      };

    default:
      return state;
  }
};

export default verseReducer;
