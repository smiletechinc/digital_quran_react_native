import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updatePara = (para: ParaMeta) => {
  return {
    type: actionTypes.UPDATE_PARA,
    para,
  };
};
