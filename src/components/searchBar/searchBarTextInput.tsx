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
import {SearchContext, SearchContextType} from '../../context/searchContext';

type SearchBarProps = {
  clickCheck: any;
  clickValue: boolean;
  editableTextCheck: boolean;
};
const SearchBarText: React.FunctionComponent<SearchBarProps> = props => {
  const {clickCheck, clickValue, editableTextCheck} = props;
  const {setCharacters, characters, setChangeText, textValue} =
    React.useContext(SearchContext) as SearchContextType;
  const {handleChange} = SearchAyahHook();
  const [clickTextInput, setClickTextInput] = useState(false);

  useEffect(() => {
    if (characters.length > 0) {
      console.log('charabcter', characters);
    }
  }, [characters]);

  return (
    <View style={styles.searchContainer}>
      <View
        style={
          clickValue ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <TextInput
          value={textValue}
          onChangeText={text => handleChange(text)}
          onFocus={() => {
            clickCheck(true);
          }}
          placeholder={t('search here')}
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
