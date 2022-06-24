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
    // case actionTypes.DECREAMENT_TASBEEH:
    //   console.log("value of decreament", action);
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             currentCount: tasbeeh.currentCount - 1,
    //           }
    //         : tasbeeh
    //     ),
    //   };
    case actionTypes.UPDATE_SURAH:
      console.log('update surah in reducer', action.surah);
      return {
        ...state,
        surahs: action.surah,
      };
    // case actionTypes.EDIT_TASBEEH:
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             currentCount: action.editCount,
    //             targetCount: action.editTarget,
    //           }
    //         : tasbeeh
    //     ),
    //   };
    // case actionTypes.INCREAMENT_TASBEEH:
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             currentCount: tasbeeh.currentCount + 1,
    //             totalCount: tasbeeh.totalCount + 1,
    //             timeTasbeehReading: action.time,
    //           }
    //         : tasbeeh
    //     ),
    //   };
    // case actionTypes.RESET_TASBEEH:
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             currentCount: 0,
    //             targetCount: 100,
    //             totalCount: 0,
    //             timeTasbeehReading: 0,
    //           }
    //         : tasbeeh
    //     ),
    //   };

    // case actionTypes.FAVOURITE_TASBEEH:
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             likedBy: tasbeeh.likedBy.concat(action.createdId),
    //           }
    //         : tasbeeh
    //     ),
    //   };
    // case actionTypes.REMOVE_FAVOURITE_TASBEEH:
    //   return {
    //     ...state,
    //     tasbeehs: state.tasbeehs.map((tasbeeh, index) =>
    //       index === action.index
    //         ? {
    //             ...tasbeeh,
    //             likedBy: state.tasbeehs.map((tasbeeh, index) => {
    //               index === action.index
    //                 ? tasbeeh.likedBy.filter((tasbee: any) => {
    //                     tasbee === action.createdId
    //                       ? delete tasbeeh.likedBy[
    //                           tasbeeh.likedBy.indexOf(tasbee)
    //                         ]
    //                       : tasbeeh;
    //                   })
    //                 : tasbeeh;
    //             }),
    //           }
    //         : tasbeeh
    //     ),
    //   };
    default:
      return state;
  }
};

export default surahReducer;
