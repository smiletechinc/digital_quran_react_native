import {useCallback, useEffect, useState} from 'react';
import app from '../config/db';
import {getDatabase, ref, set, get, child, remove} from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

interface Props {
  arabictext: any;
}

export const userAuthencticationHook = () => {
  const [userCreateId, setUSerCreateID] = useState('');
  const [userCreateError, setUserCreateError] = useState('');
  const [userRegister, setUserRegistered] = useState(false);
  const [userRegisterError, setUserRegisteredError] = useState('');
  const [getUserCredentialId, setGetUserCredentialId] = useState('');
  const [userRecievedObject, setUserRecievedObject] = useState({});
  const [userRecivedError, setUserRecievedError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordEmailSend, setResetPasswordSend] = useState(false);

  const SignUpService = async (authObject: AuthObject) => {
    try {
      console.log('auth', app);
      const {email, password} = authObject;
      if (app) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: {user: any}) => {
            const user = userCredential.user;
            console.log('userCredential: ', JSON.stringify(userCredential));
            console.log('user: ', JSON.stringify(user.uid));
            setUSerCreateID(user.uid);
          })
          .catch((error: {code: any; message: any}) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setUserCreateError(JSON.stringify(errorMessage));
            console.log('errorCode: ', JSON.stringify(errorCode));
            console.log('errorMessage: ', JSON.stringify(errorMessage));
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        console.log('error in creating authObject: ', JSON.stringify(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterUser = async (userObject: UserObject) => {
    try {
      setUSerCreateID('');
      console.log('userObject', userObject);
      const branch = `/users/${userObject.id}`;
      console.log('Branch: ', branch);
      const db = getDatabase(app);
      if (db) {
        set(ref(db, branch), userObject)
          .then(data => {
            setUserRegistered(true);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setUserRegisteredError(JSON.stringify(error.message));
            console.log(
              'error while registering',
              JSON.stringify(error.message),
            );
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        console.log('error in register: ', JSON.stringify(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignInService = async (loginObject: AuthObject) => {
    const {email, password} = loginObject;
    if (app) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          console.log('User: ', JSON.stringify(userCredential));
          console.log('user: ', JSON.stringify(user));
          setGetUserCredentialId(JSON.stringify(user.uid));
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorMessage: ', errorMessage);
          setUserRecievedError(errorMessage);
        });
    } else {
      const error: ErrorObject = {
        message: 'Something went wrong while executing your request',
      };
      console.log('error while login: ', JSON.stringify(error));
    }
  };

  const getUserDetail = async (userId: UserObject) => {
    try {
      setGetUserCredentialId('');
      console.log('userObject', userId);
      const branch = `/users/${userId}`;
      console.log('Branch: ', branch);
      const db = getDatabase(app);
      if (db) {
        get(ref(db, branch))
          .then(snapshot => {
            if (snapshot.exists()) {
              console.log('snapshot', snapshot);
              setUserRecievedObject(snapshot.val());
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
            setUserRegisteredError(JSON.stringify(error.message));
            console.log(
              'error while fetching data',
              JSON.stringify(error.message),
            );
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        console.log('error in lgoin: ', JSON.stringify(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordSevice = async (email: string) => {
    try {
      if (app) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(user => {
            setResetPasswordSend(true);
            console.log(
              'Email has sent on the your relevant email account for reset password.',
              user,
            );
            // Signed in
            // onSuccess(user);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // onFailure(error);
            setResetPasswordError(errorMessage);
            console.log(
              'Error in reseting Password',
              JSON.stringify(error.message),
            );
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        console.log('Error in reseting Password', error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    SignUpService,
    userCreateId,
    RegisterUser,
    userRegister,
    SignInService,
    getUserCredentialId,
    getUserDetail,
    userRecievedObject,
    setUserRecievedError,
    userRecivedError,
    resetPasswordSevice,
    setResetPasswordError,
    resetPasswordError,
    resetPasswordEmailSend,
    setResetPasswordSend,
  };
};
