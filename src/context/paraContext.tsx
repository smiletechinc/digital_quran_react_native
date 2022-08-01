export interface paraContextType {
  paraObject: any;
}

export type ParaContextType = {
  addPara: (paraObject: void) => void;
  paraData: any;
  setParaObject: (paraObject: Object) => void;
  paraObject: any;
};

import * as React from 'react';

export const ParaContext = React.createContext<ParaContextType | null>(null);
const ParaContextProvider = ({children}: any) => {
  const [paraObject, setParaObject] = React.useState<Object>([]);
  const [paraData, setParaData] = React.useState<any>([]);

  const addPara = (para: any) => {
    // console.log('para in context', para);
    setParaData(para);
  };
  return (
    <ParaContext.Provider
      value={{
        addPara,
        paraData,
        setParaObject,
        paraObject,
      }}>
      {children}
    </ParaContext.Provider>
  );
};

export default ParaContextProvider;
