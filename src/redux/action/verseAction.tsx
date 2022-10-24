import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updateAyat = (ayat: QuranMeta) => {
  return {
    type: actionTypes.UPDATE_AYATS,
    ayat,
  };
};
