import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: SurahState = {
  surahs: [
    {
      place: '',
      type: '',
      count: 0,
      title: '',
      titleArabic: '',
      index: 0,
      pages: 0,
      juz: [],
      filePath: '',
    },
  ],
};

const surahReducer = (
  state: SurahState = initialState,
  action: AnyAction,
): SurahState => {
  switch (action.type) {
    case actionTypes.UPDATE_SURAH:
      return {
        ...state,
        surahs: action.surah,
      };
    default:
      return state;
  }
};

export default surahReducer;
