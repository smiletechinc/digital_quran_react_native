import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updateSurah = (surah: SurahMeta) => {
  console.log('surah in action', surah);
  return {
    type: actionTypes.UPDATE_SURAH,
    surah,
  };
};
