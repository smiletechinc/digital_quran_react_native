import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updateSurah = (surah: SurahMeta) => {
  return {
    type: actionTypes.UPDATE_SURAH,
    surah,
  };
};
