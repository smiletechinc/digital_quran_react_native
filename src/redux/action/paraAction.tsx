import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updatePara = (para: ParaMeta) => {
  // console.log('Para in action', para);
  return {
    type: actionTypes.UPDATE_PARA,
    para,
  };
};
