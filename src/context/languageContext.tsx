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
  //   const soundCheckedFunction = (sound: boolean) => {
  //     console.log('sound before update', sound);
  //     setSoundChecked(sound);
  //     console.log('sound after update', soundChecked);
  //   };

  //   const vibrationCheckedFunction = (vibration: boolean) => {
  //     setVibratinChecked(vibration);
  //   };

  //   const currentCountVibrationCheckedFunction = (vibration: boolean) => {
  //     setCurrentCountVibration(vibration);
  //   };

  //   const targetCountVibratonCheckedFunction = (targetVibration: boolean) => {
  //     setTargetCountVibration(targetVibration);
  //   };

  //   const muteFunction = () => {
  //     console.log('hello');
  //     setSoundChecked(false);
  //   };

  //   const removeBookmarkFunction = (setBook: boolean) => {
  //     setRemoveBookmark(setBook);
  //   };
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
