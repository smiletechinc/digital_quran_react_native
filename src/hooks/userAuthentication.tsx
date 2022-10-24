import {useCallback, useEffect, useState} from 'react';
import app from '../config/db';
import {getDatabase, ref, set, get, child, remove} from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

interface Props {
  arabictext: any;
}

export const userAuthencticationHook = () => {
  const [userCreateId, setUSerCreateID] = useState('');
  const [userCreateError, setUserCreateError] = useState('');
  const [userRegister, setUserRegistered] = useState(false);
  const [getUserCredentialId, setGetUserCredentialId] = useState('');
  const [userRecievedObject, setUserRecievedObject] = useState<UserObject>({
    email: '',
    id: '',
    name: '',
  });
  const [userRecivedError, setUserRecievedError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordEmailSend, setResetPasswordSend] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [deleteAccountUser, setDeleteAccountUser] = useState(false);

  const SignUpService = async (authObject: AuthObject) => {
    try {
      const {email, password} = authObject;
      if (app) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: {user: any}) => {
            const user = userCredential.user;
            setUSerCreateID(user.uid);
          })
          .catch((error: {code: any; message: any}) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setUserCreateError(errorMessage);
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
      const branch = `/users/${userObject.id}`;
      const db = getDatabase(app);
      if (db) {
        set(ref(db, branch), userObject)
          .then(data => {
            setUserRegistered(true);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
          setGetUserCredentialId(JSON.stringify(user.uid));
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
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
      const branch = `/users/${userId}`;
      const db = getDatabase(app);
      if (db) {
        get(ref(db, branch))
          .then(snapshot => {
            if (snapshot.exists()) {
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

  const logoutService = async () => {
    try {
      if (app) {
        const auth = getAuth();
        signOut(auth)
          .then(userCredential => {
            setLogoutUser(true);
            // Signed in
            // onSuccess(userCredential);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // onFailure(error);
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        // onFailure(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccountService = async () => {
    try {
      if (app) {
        const db = getDatabase();
        const auth = getAuth();
        const branch = `/users/${auth.currentUser?.uid}`;
        remove(ref(db, branch)).then(() => console.log('true'));
        auth.currentUser
          ?.delete()
          .then(userCredential => {
            setDeleteAccountUser(true);
            // Signed in
            // onSuccess(userCredential);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('account not deleted,');
            // onFailure(error);
          });
      } else {
        const error: ErrorObject = {
          message: 'Something went wrong while executing your request',
        };
        // onFailure(error);
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
    userCreateError,
    setUserCreateError,
    logoutUser,
    deleteAccountUser,
    deleteAccountService,
    setDeleteAccountUser,
    logoutService,
    setLogoutUser,
  };
};
