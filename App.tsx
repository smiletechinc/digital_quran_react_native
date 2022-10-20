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
  AuthContextProvider,
} from './src/context/index';
const App = () => {
  return (
    <BookmarkVerseContextProvider>
      <LanguageContextProvider>
        <SurahContextProvider>
          <ParaContextProvider>
            <VerseContextProvider>
              <SearchContextProvider>
                <AuthContextProvider>
                  <RootNavigator />
                </AuthContextProvider>
              </SearchContextProvider>
            </VerseContextProvider>
          </ParaContextProvider>
        </SurahContextProvider>
      </LanguageContextProvider>
    </BookmarkVerseContextProvider>
  );
};

export default App;
