import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './index';
import {clearSearchBar, searchIcon} from '../constants/images';
import {VerseContext, QuranContextType} from '../context/quranContext';
import {debounce} from 'lodash';
import {SearchList} from '../components/List/index';
type Props = {
  navigation: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [textValue, setChangeText] = React.useState('');
  const [characters, setCharacters] = React.useState<any[]>([]);
  const [clicked, setClicked] = React.useState(false);

  const LogFunc = () => {
    navigation.replace('HomeScreen');
  };

  const search = async (criteria: string) => {
    let ayatArr: any = [];
    const response = versesObject.map((verseObj: any) => {
      return Object.values(verseObj.verse);
    });
    const results = await Promise.all(
      response.map((verseObject: any) => {
        Object.values(verseObject).filter(
          (ayat: any, index: string | number) => {
            if (
              JSON.stringify(ayat)
                .replace(
                  /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
                  '',
                )
                .includes(
                  JSON.stringify(criteria).replace(
                    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
                    '',
                  ),
                )
            ) {
              console.log('ayat', ayat);
              ayatArr.push(ayat);
            }
          },
        );
      }),
    );
    console.log('resultsed', ayatArr);
    setCharacters(ayatArr);
  };
  const handleChange = async (e: string) => {
    setChangeText(e);
    setClicked(true);
    var debounce_fun = await debounce(() => search(e), 3000);
    debounce_fun();
  };

  const renderItem = ({item}: any) => {
    return <SearchList surah={item} />;
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 120},
      ]}>
      <View style={styles.searchContainer}>
        <View
          style={
            clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
          }>
          <TextInput
            value={textValue}
            onChangeText={text => handleChange(text)}
            placeholder="Search here"
            onFocus={() => {
              setClicked(true);
            }}
            style={styles.inputSearch}
          />
          <Image source={searchIcon} />
        </View>
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setChangeText(''), setClicked(false), setCharacters([]);
            }}>
            <Image source={clearSearchBar} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        style={styles.listContainer}
        data={characters}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchingScreen;
