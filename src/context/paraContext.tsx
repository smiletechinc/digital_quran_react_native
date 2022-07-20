export interface paraContextType {
  paraObject: object;
}

export type ParaContextType = {
  paraObject: object;
  setParaObject: (setObject: object) => void;
};

import * as React from 'react';

export const ParaContext = React.createContext<ParaContextType | null>(null);

const ParaContextProvider = ({children}: any) => {
  const [paraObject, setParaObject] = React.useState<object>({});

  return (
    <ParaContext.Provider
      value={{
        setParaObject,
        paraObject,
      }}>
      {children}
    </ParaContext.Provider>
  );
};

export default ParaContextProvider;
