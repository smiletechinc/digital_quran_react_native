import React, {useCallback, useEffect, useState} from 'react';
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
  query,
  orderByChild,
  push,
  equalTo,
  orderByKey,
} from 'firebase/database';
import app from '../config/db';
import {useDispatch} from 'react-redux';
import {updateSurah} from '../redux/action/surahAction';
import {updatePara} from '../redux/action/paraAction';
import {
  addNewBook,
  updateBook,
  updateWholeBook,
  deleteFavBook,
} from '../redux/action/favVerseAction';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';

export const FirebaseDataHook = () => {
  const [fetchAyahObjectID, setFetchAyahObjectID] = useState({});
  const [fetchBookObject, setFetchBookObject] = useState({});
  const [fetchAyahObject, setFetchAyahObject] = useState({});
  const {addInVerseBook, removeInVerseBook, updateVerseBookLibrary} =
    React.useContext(BookmarkVerseContext) as BookmarkVerseContextType;
  const dispatch = useDispatch();

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

  const getAyahId = async (verseText: string) => {
    const text = JSON.stringify(verseText).replace(
      /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z])/g,
      '',
    );
    const branch = '/verse/';
    const db = getDatabase(app);
    if (db) {
      const queryRef = query(
        ref(db, branch),
        orderByChild('ayatSearch'),
        equalTo(text),
      );
      get(queryRef)
        .then(snapshot => {
          // console.log('ayatId', snapshot.val());
          setFetchAyahObjectID(snapshot.val());
        })
        .catch(error => console.log('errro', error));
    }
  };

  const fetchBookmark = async (userId: string) => {
    console.log('userIdasfasf', userId);
    const branch = '/BookmarkLibrary/';
    const db = getDatabase(app);
    if (db) {
      const queryRef = query(
        ref(db, branch),
        orderByChild('createdId'),
        equalTo(userId),
      );
      get(queryRef)
        .then(snapShot => {
          dispatch(updateWholeBook(snapShot.val()));
          setFetchBookObject(snapShot.val());
        })
        .catch(error => {
          console.log('error fetching bookmark', error);
        });
    } else {
      console.log('database not found');
    }
  };

  const addAyatInBookmark = async (
    libraryData: any,
    libraryName: string,
    createdId: string,
  ) => {
    try {
      const db = getDatabase(app);
      const branch = `/BookmarkLibrary/`;
      if (db) {
        const getBookID = push(ref(db, branch)).key;
        var updateBookLibrary = {
          libraryData,
          id: getBookID,
          createdId: createdId,
          isCheck: false,
          libraryName: libraryName,
        };

        set(ref(db, `/BookmarkLibrary/${getBookID}`), updateBookLibrary)
          .then(() => {
            dispatch(addNewBook(updateBookLibrary));
            addInVerseBook(updateBookLibrary);
          })
          .catch(() => {});
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
      }
    } catch (error) {
      console.log('error in starrt', error);
    }
  };

  const updateAyatInBookmark = async (
    libraryIdKey: any,
    librayUpdateObj: any,
  ) => {
    try {
      const db = getDatabase(app);
      const branch = `/BookmarkLibrary/`;
      if (db) {
        const queryRef = query(
          ref(db, branch),
          orderByKey(),
          equalTo(libraryIdKey),
        );
        get(queryRef).then(snapShot => {
          if (snapShot.exists()) {
            set(
              ref(db, `/BookmarkLibrary/${libraryIdKey}/libraryData`),
              librayUpdateObj,
            ).then(() => {
              updateVerseBookLibrary(librayUpdateObj, libraryIdKey);
              dispatch(updateBook(librayUpdateObj, libraryIdKey));
            });
          }
        });
      }
    } catch (error) {
      console.log('error in starrt', error);
    }
  };

  const getAyah = async (verseId: string) => {
    setFetchAyahObject({});
    // console.log('verseId', verseId);
    const branch = `/verse/${verseId}`;
    const db = getDatabase(app);
    if (db) {
      get(ref(db, branch))
        .then(snapshot => {
          // console.log('ayatVerse', snapshot.val());
          setFetchAyahObject(snapshot.val());
        })
        .catch(error => console.log('errro', error));
    }
  };

  const removeBookmark = async (verseId: string) => {
    console.log('bookId', verseId);
    const branch = `/BookmarkLibrary/${verseId}`;
    const db = getDatabase(app);
    if (db) {
      remove(ref(db, branch))
        .then(snapshot => {
          dispatch(deleteFavBook(verseId));
          removeInVerseBook(verseId);
          console.log('deleted');
        })
        .catch(error => console.log('errro', error));
    }
  };

  return {
    // surahMetaFetch,
    getAyahId,
    getAyah,
    getSurahMetaData,
    getParaMeta,
    addAyatInBookmark,
    removeBookmark,
    fetchAyahObjectID,
    fetchBookObject,
    fetchAyahObject,
    fetchBookmark,
    updateAyatInBookmark,
  };
};
