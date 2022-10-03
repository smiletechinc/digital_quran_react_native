import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updateAyat = (ayat: QuranMeta) => {
  // console.log('verse in action', ayat);
  return {
    type: actionTypes.UPDATE_AYATS,
    ayat,
  };
};
