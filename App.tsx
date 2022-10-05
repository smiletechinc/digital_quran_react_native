import * as React from 'react';
import {View, Text} from 'react-native';
import RootNavigator from './src/navigation/RootNaivgator';
import {Card} from 'react-native-paper';
import {
  LanguageContextProvider,
  SurahContextProvider,
  ParaContextProvider,
  VerseContextProvider,
  SearchContextProvider,
  BookmarkVerseContextProvider,
} from './src/context/index';
const App = () => {
  return (
    <SearchContextProvider>
      <BookmarkVerseContextProvider>
        <LanguageContextProvider>
          <SurahContextProvider>
            <ParaContextProvider>
              <VerseContextProvider>
                <RootNavigator />
              </VerseContextProvider>
            </ParaContextProvider>
          </SurahContextProvider>
        </LanguageContextProvider>
      </BookmarkVerseContextProvider>
    </SearchContextProvider>
  );
};

export default App;
