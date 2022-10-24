export interface surahContextType {
  surahObject: object;
  index: number;
}

export type SurahContextType = {
  surahObject: object;
  setSurahObject: (setSurah: object) => void;
};

import * as React from 'react';

export const SurahContext = React.createContext<SurahContextType | null>(null);

const SurahContextProvider = ({children}: any) => {
  const [surahObject, setSurahObject] = React.useState<object>({});

  React.useEffect(() => {
    if (surahObject) {
    }
  }, [surahObject]);

  return (
    <SurahContext.Provider
      value={{
        setSurahObject,
        surahObject,
      }}>
      {children}
    </SurahContext.Provider>
  );
};

export default SurahContextProvider;
