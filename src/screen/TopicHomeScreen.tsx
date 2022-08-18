import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, FlatList, Text} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import {favIcon, favSelectIcon} from '../constants/images';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';

type Props = {
  navigation: any;
  updated: boolean;
  reduxFavouriteVerse: any;
};

let updatedOuter = false;

const TopicsScreen: React.FunctionComponent<Props> = props => {
  const {favoriteVerses, removeInVerseBook} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteVerses) {
      setIsFavorite(false);
    }
  }, [favoriteVerses, isFavorite]);

  const favFunctionCalled = (item: any) => {
    console.log('item in function called', item);
    var bookVerse = {
      surahNumber: item.surahNumber,
      ayatNumber: item.ayatNumber,
      ayatText: item.ayatText,
    };
    removeInVerseBook(bookVerse);
    setIsFavorite(true);
  };

  const renderItem = ({item}: any) => {
    return (
      <View
        style={[
          {
            display: 'flex',
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginTop: 16,
            borderStyle: 'solid',
            borderRadius: 8,
            borderColor: 'rgba(112,112,112,0.5)',
            backgroundColor: 'rgba(255,255,255,0.795)',
            marginHorizontal: 16,
            paddingVertical: 16,
            paddingHorizontal: 12,
            marginVertical: 4,
            justifyContent: 'center',
          },
        ]}>
        <TouchableOpacity
          style={{padding: 32}}
          onPress={value => {
            favFunctionCalled(item);
          }}>
          <Image source={favSelectIcon} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Arial',
            color: '#1A1A1A',
          }}>
          {item.ayatText}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            marginVertical: 4,
            fontSize: 20,
            color: '#C7AA35',
          }}>{`(${item.surahNumber}:${item.ayatNumber})`}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 68},
      ]}>
      <FlatList
        style={[styles.listContainer]}
        data={favoriteVerses}
        renderItem={renderItem}
      />
    </View>
  );
};
const mapStateToProps = (state: {bookMarkVerses: {favVerses: any}}) => {
  return {
    reduxFavouriteVerse: state.bookMarkVerses.favVerses,
    updated: !updatedOuter,
  };
};
export default connect(mapStateToProps, null)(TopicsScreen);
