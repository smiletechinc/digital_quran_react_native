import * as React from 'react';
import {View, Text} from 'react-native';
import RootNavigator from './src/navigation/RootNaivgator';
import {Card} from 'react-native-paper';
import {
  LanguageContextProvider,
  SurahContextProvider,
  ParaContextProvider,
  VerseContextProvider,
  BookmarkVerseContextProvider,
  SearchContextProvider,
} from './src/context/index';
const App = () => {
  return (
    <BookmarkVerseContextProvider>
      <LanguageContextProvider>
        <SurahContextProvider>
          <ParaContextProvider>
            <VerseContextProvider>
              <SearchContextProvider>
                <RootNavigator />
              </SearchContextProvider>
            </VerseContextProvider>
          </ParaContextProvider>
        </SurahContextProvider>
      </LanguageContextProvider>
    </BookmarkVerseContextProvider>
  );
};

export default App;
