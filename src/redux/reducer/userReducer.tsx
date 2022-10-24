import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: UserState = {
  authUser: {
    email: '',
    id: '',
    name: '',
  },
};

const userReducer = (
  state: UserState = initialState,
  action: AnyAction,
): UserState => {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        authUser: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
