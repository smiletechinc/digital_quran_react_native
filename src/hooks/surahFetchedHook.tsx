import {useCallback, useEffect, useState} from 'react';
import app from '../config/db';
import {getDatabase, ref, set, get, child, remove} from 'firebase/database';

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

  return {
    userCreateId,
    RegisterUser,
    userRegister,
    getUserCredentialId,
    getUserDetail,
    userRecievedObject,
    setUserRecievedError,
    userRecivedError,
    setResetPasswordError,
    resetPasswordError,
    resetPasswordEmailSend,
    setResetPasswordSend,
    userCreateError,
    setUserCreateError,
    logoutUser,
    deleteAccountUser,
    setDeleteAccountUser,
    setLogoutUser,
  };
};
