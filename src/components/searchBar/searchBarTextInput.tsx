import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {t} from 'i18next';
import {debounce} from 'lodash';
import {SearchAyahHook} from '../../hooks/searchHook';
import {clearSearchBar, searchIcon} from '../../constants/images';

type SearchBarProps = {
  clickCheck: any;
  clickValue: boolean;
};
const SearchBarText: React.FunctionComponent<SearchBarProps> = props => {
  const {clickCheck, clickValue} = props;
  const [textValue, setChangeText] = React.useState('');
  const {searchVerse, setStartAnimation, setCharacters} = SearchAyahHook();

  const handleChange = async (e: string) => {
    setChangeText(e);
    clickCheck(true);
    setStartAnimation(true);
    var debounce_fun = await debounce(() => searchVerse(e), 3000);
    debounce_fun();
  };

  return (
    <View style={styles.searchContainer}>
      <View
        style={
          clickValue ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <TextInput
          value={textValue}
          onChangeText={text => handleChange(text)}
          placeholder={t('search here')}
          onFocus={() => {
            clickCheck(true);
          }}
          style={styles.inputSearch}
        />
        <Image source={searchIcon} />
      </View>
      {clickValue && (
        <TouchableOpacity
          onPress={() => {
            setChangeText(''), clickCheck(false), setCharacters([]);
          }}>
          <Image source={clearSearchBar} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBarText;

const styles = StyleSheet.create({
  searchContainer: {
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: 'transparent',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'transparent',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSearch: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});
