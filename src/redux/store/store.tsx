import {createStore, combineReducers, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import surahReducer from '../reducer/surahReducer';

const rootReducer = combineReducers({
  surahs: surahReducer,
});

const persistConfig = {
  key: 'root',
  versino: 0,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
console.log('store state is ', store.getState());

export {store};
export type AppDispatch = typeof store.dispatch;
