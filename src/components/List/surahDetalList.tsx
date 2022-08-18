import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {favIcon, favSelectIcon, selectionIcon} from '../../constants/images';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../../context/favouriteVerseContext';
type Props = {
  verse: any;
  indexAyat: any;
  onPress?: any;
  isSurahFathia: any;
  favButtonPress: any;
  favImage?: any;
  ayaObject: Object;
};

const SurahDetailList: React.FunctionComponent<Props> = props => {
  const {
    verse,
    onPress,
    indexAyat,
    isSurahFathia,
    favButtonPress,
    favImage,
    ayaObject,
  } = props;
  const {t} = useTranslation();
  const {isBookmarked, checkBookmarked} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;
  const [isFavorite, setIsFavorite] = useState(isBookmarked);

  useEffect(() => {
    // checkBookmarked(ayaObject);
    // setIsFavorite(isBookmarked);
  }, []);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={{padding: 8}}
        onPress={() => {
          setIsFavorite(!isFavorite), favButtonPress();
        }}>
        <Image source={checkBookmarked(ayaObject) ? favSelectIcon : favIcon} />
      </TouchableOpacity>
      <Text style={styles.itemText} onPress={onPress}>
        {verse}
      </Text>
      <Text
        style={{
          textAlign: 'left',
          marginVertical: 4,
          fontSize: 20,
          color: '#C7AA35',
        }}>
        &#xFD3E;{indexAyat}&#xFD3F;
      </Text>
    </View>
  );
};

export default SurahDetailList;
const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(255,255,255,0.34)',
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Arial',
    color: '#1A1A1A',
  },
});
