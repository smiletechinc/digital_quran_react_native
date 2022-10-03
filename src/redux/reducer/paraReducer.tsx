import {act} from 'react-test-renderer';
import {AnyAction} from 'redux';
import * as actionTypes from '../action/actionTypes';

const initialState: ParaState = {
  parahs: [],
};

const paraReducer = (
  state: ParaState = initialState,
  action: AnyAction,
): ParaState => {
  switch (action.type) {
    case actionTypes.UPDATE_PARA:
      console.log('paraReducer', action.para);
      return {
        ...state,
        parahs: action.para,
      };
    default:
      return state;
  }
};

export default paraReducer;
