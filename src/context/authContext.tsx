export interface authContextType {
  surahObject: object;
  index: number;
}

export type AuthContextType = {
  authUser: Object;
  setAuthUser: (setUser: object) => void;
  authObject: Object;
  setAuthObject: (setUserObject: object) => void;
};

import * as React from 'react';

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthContextProvider = ({children}: any) => {
  const [authUser, setAuthUser] = React.useState<object>({});
  const [authObject, setAuthObject] = React.useState<object>({});

  return (
    <AuthContext.Provider
      value={{
        setAuthObject,
        setAuthUser,
        authUser,
        authObject,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
