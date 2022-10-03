export interface languageContextType {
  text: string;
}

export type LanguageContextType = {
  textLanguage: string;
  setTextLanguage: (setText: string) => void;
};

import * as React from 'react';

export const LanguageContext = React.createContext<LanguageContextType | null>(
  null,
);

const LanguageContextProvider = ({children}: any) => {
  const [textLanguage, setTextLanguage] = React.useState<string>('');

  return (
    <LanguageContext.Provider
      value={{
        setTextLanguage,
        textLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
