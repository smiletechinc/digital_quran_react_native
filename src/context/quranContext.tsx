export interface quranContextType {
  versesObject: Object;
}

export type QuranContextType = {
  setVersesObject: (verseObject: Object) => void;
  versesObject: any;
};

import * as React from 'react';

export const VerseContext = React.createContext<QuranContextType | null>(null);

const VerseContextProvider = ({children}: any) => {
  const [versesObject, setVersesObject] = React.useState<Object>([]);
  let allVerse: any = [];
  // const addPara = (para: any) => {
  //   allPara.push(para);
  // };
  return (
    <VerseContext.Provider
      value={{
        setVersesObject,
        versesObject,
      }}>
      {children}
    </VerseContext.Provider>
  );
};

export default VerseContextProvider;
