import {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {getDatabase, ref, set, get, child, remove} from 'firebase/database';
import app from '../config/db';
import {useDispatch} from 'react-redux';
import {updateSurah} from '../redux/action/surahAction';
import {updatePara} from '../redux/action/paraAction';

interface Props {
  arabictext: any;
}

const dispatch = useDispatch();

export const FirebaseDataHook = () => {
  //   const [surahMetaFetch, setSurahMetaFetch] = useState({});
  const getSurahMetaData = async () => {
    try {
      const branch = `/surahMeta/`;
      const db = getDatabase(app);
      if (db) {
        get(ref(db, branch))
          .then(snapshot => {
            if (snapshot.exists()) {
              //   setSurahMetaFetch(snapshot.val());
              dispatch(updateSurah(snapshot.val()));
            } else {
              console.log('No data available');
              const error: ErrorObject = {
                code: '404',
                message: 'No data available',
              };
            }
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(
              'error while fetching data',
              JSON.stringify(error.message),
            );
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getParaMeta = async () => {
    try {
      const branch = `/paraMeta/`;
      const db = getDatabase(app);
      if (db) {
        get(ref(db, branch))
          .then(snapshot => {
            if (snapshot.exists()) {
              dispatch(updatePara(snapshot.val()));
            } else {
              console.log('No data available');
              const error: ErrorObject = {
                code: '404',
                message: 'No data available',
              };
            }
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(
              'error while fetching data',
              JSON.stringify(error.message),
            );
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // surahMetaFetch,
    getSurahMetaData,
    getParaMeta,
  };
};
