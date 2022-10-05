import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-fast-toast';
import {t} from 'i18next';
import {FloatingButton} from '../components/buttons';
import {styles} from './index';
import {ClipboardHook} from '../hooks/clipboardHook';
import SearchHeaderDetail from '../components/Header/searchHeader';
import EmptyState from '../components/emptyState/index';
// import NoDataFound from '../components/emptyState/noDataFound';
import {searchImage, clearSearchBar, searchIcon} from '../constants/images';
import {
  SearchBarText,
  SearchBarDisplayResult,
} from '../components/searchBar/index';
// import {SearchContext, SearchContextType} from '../context/searchContext';
// import SearchHeaderDetail from '../components/Header/searchHeader';
// import {SearchAyahHook} from '../hooks/searchHook';
import {SCREEN_HEIGHT, MULTIPLIER} from '../constants/';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {debounce} from 'lodash';
import {SearchList} from '../components/List/index';
import ContentLoader, {Rect} from 'react-content-loader/native';
import HeaderWithText from '../components/Header/header';

type Props = {
  navigation: any;
  route?: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const toast = useRef(null);
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  // const {searchInAdvanced, handleChange, searchDatainFIle} = SearchAyahHook();
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [clicked, setClicked] = React.useState(false);
  const [isImage, setIsImage] = useState<string | null>(null);

  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show(`${t('copy to clipboard')}`, {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  const LogFunc = () => {
    navigation.navigate('Surah');
  };

  const searchByImage = () => {
    console.log('hello');
    // navigation.navigate('CameraSearchScreen');
  };

  return (
    <ScrollView style={{marginBottom: 16}} showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.selectionContainer,
          {backgroundColor: '#00B4AC', paddingTop: 120},
        ]}>
        <SearchHeaderDetail navigation={navigation} selectedImage={isImage} />
        <Toast ref={toast} placement="bottom" />
        <SearchBarText clickCheck={setClicked} clickValue={clicked} />
        {characters.length > 0 || clicked ? (
          <SearchBarDisplayResult />
        ) : (
          <EmptyState
            buttonTitle={'read quran'}
            searchScreen={true}
            onPress={LogFunc}
            imageDisplay={searchImage}
          />
        )}
      </View>
      <View
        style={{
          marginTop: SCREEN_HEIGHT - 128,
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          display: 'flex',
          position: 'absolute',
        }}>
        <FloatingButton onPressImage={searchByImage} />
      </View>
    </ScrollView>
  );
};

export default SearchingScreen;
