import {useCallback, useEffect, useState} from 'react';
// import app from '../config/db';
// import {getDatabase, ref, set, get, child, remove} from 'firebase/database';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from 'firebase/auth';

interface Props {
  arabictext: any;
}

export const userAuthencticationHook = () => {
  const SignUpService = async (authObject: AuthObject) => {
    try {
      console.log('auth', app);
      const {email, password} = authObject;
      // if (app) {
      //   const db = getDatabase(app);
      //   const auth = getAuth();
      //   signInWithEmailAndPassword(auth, email, password)
      //     .then((userCredential: {user: any}) => {
      //       // Signed in
      //       const user = userCredential.user;
      //       console.log('userCredential: ', JSON.stringify(userCredential));
      //       console.log('user: ', JSON.stringify(user));
      //       // onSuccess(user);
      //     })
      //     .catch((error: {code: any; message: any}) => {
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //       console.log('errorCode: ', JSON.stringify(errorCode));
      //       console.log('errorMessage: ', JSON.stringify(errorMessage));
      //       // onFailure(error);
      //     });
      // } else {
      //   const error: ErrorObject = {
      //     message: 'Something went wrong while executing your request',
      //   };
      //   // onFailure(error);
      // }
      // console.log('araci', arabicText);
      // Clipboard.setString(arabicText);
      // const text = await Clipboard.getString();
      // setTextCopyStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    SignUpService,
    // copyToClipboard,
    // textCopyStatus,
    // setTextCopyStatus,
  };
};
