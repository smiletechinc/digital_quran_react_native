import {act} from 'react-test-renderer';
import * as actionTypes from './actionTypes';

export const updateUser = (user: UserObject) => {
  return {
    type: actionTypes.UPDATE_USER,
    user,
  };
};
