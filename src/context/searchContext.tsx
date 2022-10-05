export interface searchContextType {
  text: string;
}

export type SearchContextType = {
  startAnimation: boolean;
  setStartAnimation: (value: boolean) => void;
  characters: any;
  setCharacters: (value: any) => void;
  setChangeText: (value: string) => void;
  textValue: string;
};

import * as React from 'react';

export const SearchContext = React.createContext<SearchContextType | null>(
  null,
);

const SearchContextProvider = ({children}: any) => {
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [textValue, setChangeText] = React.useState('');
  // const addSearchTextCharacter = (searchObject: any) => {
  //   // console.log('searchObjectText', searchObject);
  //   setCharacters(searchObject);
  // };
  return (
    <SearchContext.Provider
      value={{
        startAnimation,
        setStartAnimation,
        characters,
        setCharacters,
        textValue,
        setChangeText,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
