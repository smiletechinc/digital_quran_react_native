import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import {styles} from './index';
import {clearSearchBar, searchIcon} from '../constants/images';
import {VerseContext, QuranContextType} from '../context/quranContext';

type Props = {
  navigation: any;
};

const SearchingScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const {versesObject} = React.useContext(VerseContext) as QuranContextType;
  const [textValue, setChangeText] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [arrayFilter, setArrayFilter] = useState<any>();
  const LogFunc = () => {
    navigation.replace('HomeScreen');
  };

  const searchValue = async (value: string) => {
    setChangeText(value);
    setClicked(true);
    console.log('value in search bar', value);
    // console.log('values from context', versesObject);
    const arrayFilter = versesObject.map((verseObject: any) => {
      const arr = Object.values(verseObject.verse);
      if (
        JSON.stringify(arr)
          .replace(
            /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
            '',
          )
          .includes(value)
      ) {
        // console.log('values from context', arr);
        setArrayFilter(arr);
      }
    });
    // console.log(
    //   'value in context',
    //   versesObject.filter((verseObject: any) =>
    //     Object.values(verseObject.verse).includes(value),
    //   ),
    // );
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
            onChangeText={text => searchValue(text)}
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
              setChangeText(''), setClicked(false);
            }}>
            <Image source={clearSearchBar} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text>{arrayFilter}</Text>
      </View>
    </View>
  );
};

export default SearchingScreen;
