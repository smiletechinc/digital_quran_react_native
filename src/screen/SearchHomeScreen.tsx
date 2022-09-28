import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-fast-toast';
import {t} from 'i18next';
import {FloatingButton} from '../components/buttons';
import {styles} from './index';
import {ClipboardHook} from '../hooks/clipboardHook';
import {SearchAyahHook} from '../hooks/searchHook';
import EmptyState from '../components/emptyState/index';
import {searchImage} from '../constants/images';
import {
  SearchBarText,
  SearchBarDisplayResult,
} from '../components/searchBar/index';

type Props = {
  navigation: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const [clicked, setClicked] = React.useState(false);
  const toast = useRef(null);
  const {textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const {characters} = SearchAyahHook();

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

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 120},
      ]}>
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
      <FloatingButton
        onPress={() => {
          console.log('hello');
        }}
      />
    </View>
  );
};

export default SearchingScreen;
