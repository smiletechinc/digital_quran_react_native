import React, {useEffect, useState, useRef} from 'react';
import {View, Image, Alert, ScrollView} from 'react-native';
import Toast from 'react-native-fast-toast';
import {t} from 'i18next';
import {FloatingButton} from '../components/buttons';
import {styles} from './index';
import {ClipboardHook} from '../hooks/clipboardHook';
import EmptyState from '../components/emptyState/index';
import NoDataFound from '../components/emptyState/noDataFound';
import {searchImage} from '../constants/images';
import {
  SearchBarText,
  SearchBarDisplayResult,
} from '../components/searchBar/index';
import {SearchContext, SearchContextType} from '../context/searchContext';
import SearchHeaderDetail from '../components/Header/searchHeader';
import {SearchAyahHook} from '../hooks/searchHook';
import {SCREEN_HEIGHT, MULTIPLIER} from '../constants/';

type Props = {
  navigation: any;
  route?: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route} = props;
  const toast = useRef(null);
  const {textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const {searchInAdvanced, handleChange, searchDatainFIle} = SearchAyahHook();
  const {
    characters,
    setCharacters,
    setStartAnimation,
    startAnimation,
    setChangeText,
    textValue,
  } = React.useContext(SearchContext) as SearchContextType;
  const [clicked, setClicked] = React.useState(false);
  const [editbaleText, setEditableText] = useState(false);
  const [isImage, setIsImage] = useState<string | null>(null);

  useEffect(() => {
    if (route.params) {
      setIsImage(route.params.imageObject.imageCapture);
      setEditableText(true);
      setCharacters('');
      setChangeText(
        JSON.stringify(route.params.imageObject.apiText).replace(
          /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669 0])/g,
          '',
        ),
      );
      setClicked(true);
      handleChange(
        JSON.stringify(route.params.imageObject.apiText).replace(
          /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669 0])/g,
          '',
        ),
      );
    }
  }, [route.params]);

  useEffect(() => {
    if (!clicked) {
      setChangeText('');
      setIsImage(null);
    }
  }, [clicked]);

  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show(`${t('copy to clipboard')}`, {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  const searchByImage = () => {
    navigation.navigate('CameraSearchScreen');
  };

  const LogFunc = () => {
    navigation.navigate('Surah');
  };

  return (
    <ScrollView style={{minHeight: SCREEN_HEIGHT}}>
      <View
        style={[
          styles.selectionContainer,
          {
            backgroundColor: '#00B4AC',
            paddingTop: 120,
          },
        ]}>
        <View>
          <Toast ref={toast} placement="bottom" />
          {isImage != null && (
            <SearchHeaderDetail
              navigation={navigation}
              selectedImage={isImage}
            />
          )}
          <SearchBarText
            clickCheck={setClicked}
            clickValue={clicked}
            editableTextCheck={editbaleText}
          />
          {characters.length > 0 || startAnimation ? (
            <SearchBarDisplayResult />
          ) : searchDatainFIle && textValue != '' ? (
            <NoDataFound
              buttonTitle={'Search In Advanced'}
              searchScreen={true}
              onPress={() => searchInAdvanced(textValue)}
              imageDisplay={searchImage}
            />
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
      </View>
    </ScrollView>
  );
};

export default SearchingScreen;
