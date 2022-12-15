import React, {useEffect, useState, useRef} from 'react';
import {Alert, View} from 'react-native';
import Toast from 'react-native-fast-toast';
import {t} from 'i18next';
import {FloatingButton} from '../components/buttons';
import {styles} from './index';
import {ClipboardHook} from '../hooks/clipboardHook';
import SearchHeaderDetail from '../components/Header/searchHeader';
import EmptyState from '../components/emptyState/index';
import NoDataFound from '../components/emptyState/noDataFound';
import {searchImage, clearSearchBar, searchIcon} from '../constants/images';
import {
  SearchBarText,
  SearchBarDisplayResult,
} from '../components/searchBar/index';
import {SearchContext, SearchContextType} from '../context/searchContext';
// import {InternetCheckedHook} from '../hooks/internetHook';
import {SearchAyahHook} from '../hooks/searchHook';
import {SCREEN_HEIGHT, MULTIPLIER} from '../constants/';
import HeaderWithText from '../components/Header/header';

type Props = {
  navigation: any;
  route?: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route} = props;
  const toast = useRef(null);
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const {searchInAdvanced} = SearchAyahHook();
  // const {internetCheckFunction, internetConditionCheck} = InternetCheckedHook();
  const [isImage, setIsImage] = useState<string | null>(null);
  const {
    startAnimation,
    characters,
    textValue,
    searchDatainFIle,
    clicked,
    setChangeText,
  } = React.useContext(SearchContext) as SearchContextType;

  useEffect(() => {
    if (route.params) {
      setIsImage(route.params.imageObject.imageCapture);
      var textFetched = JSON.stringify(
        route.params.imageObject.apiText,
      ).replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669 0])/g, '');
      setChangeText(textFetched.trim());
    }
  }, [route.params]);

  useEffect(() => {
    if (!clicked) {
      setIsImage(null);
      setChangeText('');
    }
  }, [clicked]);

  // useEffect(() => {
  // if (internetConditionCheck) {
  // navigation.navigate('CameraSearchScreen');
  // }
  // }, [internetConditionCheck]);

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
    console.log('hellsso');
    // Alert.alert('heello');
    navigation.navigate('CameraSearchScreen');
  };

  return (
    <>
      <View style={[styles.selectionContainer, {backgroundColor: '#00B4AC'}]}>
        <Toast ref={toast} placement="bottom" />
        <View>
          {isImage === null ? (
            <HeaderWithText text="Search" hideBackButton={true} />
          ) : (
            <SearchHeaderDetail
              navigation={navigation}
              selectedImage={isImage}
            />
          )}
          <SearchBarText />
        </View>

        {characters.length > 0 || clicked ? (
          searchDatainFIle ? (
            <NoDataFound
              buttonTitle={'Search In Advanced'}
              searchScreen={true}
              onPress={() => searchInAdvanced(textValue)}
              imageDisplay={searchImage}
            />
          ) : (
            <SearchBarDisplayResult />
          )
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
          marginTop: SCREEN_HEIGHT - 64,
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          display: 'flex',
          position: 'absolute',
        }}>
        <FloatingButton onPressImage={searchByImage} />
      </View>
    </>
  );
};

export default SearchingScreen;
