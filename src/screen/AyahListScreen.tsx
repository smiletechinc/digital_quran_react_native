import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {styles} from './index';
import AyahHeader from '../components/Header/ayahHeader';
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
import {favSelectIcon} from '../constants/images';
import {useSelector} from 'react-redux';

type Props = {
  navigation: any;
  route: any;
  reduxVerses: any;
  updated: boolean;
};

const AyahListScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route} = props;
  const [ayahDataDisplay, setAyahDataDisplay] = useState<any[]>();
  const [itemIndex, setItemIndex] = useState(0);
  const {
    getAyah,
    fetchAyahObject,
    fetchBookmark,
    fetchBookObject,
    updateAyatInBookmark,
  } = FirebaseDataHook();
  const userId = useSelector(
    (state: {userObject: {authUser: any}}) => state.userObject.authUser.id,
  );
  useEffect(() => {
    const libraryDataIdArray: [] = route.params.surahdata.libraryData;
    setAyahDataDisplay([]);
    libraryDataIdArray != undefined &&
      libraryDataIdArray.map(element => {
        getAyah(element);
      });
  }, [navigation]);

  useEffect(() => {
    if (Object.values(fetchBookObject).length > 0) {
      Object.values(fetchBookObject).map((product: any) => {
        var arr;
        route.params.surahdata.id === product.id &&
          ((arr = route.params.surahdata.libraryData),
          arr.splice(itemIndex, 1),
          updateAyatInBookmark(product.id, arr));
      });
      var a: any = ayahDataDisplay;
      a.splice(itemIndex, 1);
      setAyahDataDisplay(a);
    }
  }, [fetchBookObject]);

  useEffect(() => {
    if (Object.values(fetchAyahObject).length > 0) {
      var count = ayahDataDisplay?.length;
      if (Number(count) >= 1) {
        var arr: any[] = ayahDataDisplay as any;
        arr = arr.concat({
          ayatNumber: Object.values(fetchAyahObject)[0],
          surahIndex: Object.values(fetchAyahObject)[4],
          ayahText: Object.values(fetchAyahObject)[2],
        });
        setAyahDataDisplay(arr);
      } else {
        var obj = [
          {
            ayatNumber: Object.values(fetchAyahObject)[0],
            surahIndex: Object.values(fetchAyahObject)[4],
            ayahText: Object.values(fetchAyahObject)[2],
          },
        ];
        setAyahDataDisplay(obj);
      }
    }
  }, [fetchAyahObject]);

  const ayahDeleteFunc = (index: number) => {
    setItemIndex(index);
    console.log('user', userId);
    fetchBookmark(userId);
  };
  const renderItem = ({item, index}: any) => {
    return (
      <View style={[styles1.itemContainer, {justifyContent: 'flex-start'}]}>
        <TouchableOpacity
          style={{padding: 32, position: 'absolute'}}
          onPress={() => ayahDeleteFunc(index)}>
          <Image source={favSelectIcon} />
        </TouchableOpacity>
        <View style={{marginEnd: 64, width: '80%'}}>
          <Text style={styles1.ayatText1}>{item.ayahText}</Text>
          <Text style={styles1.ayatIndex1}>{` (${item.ayatNumber}:${Number(
            item.surahIndex,
          )})`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.selectionContainer,
        {backgroundColor: '#00B4AC', paddingTop: 68, marginBottom: 8},
      ]}>
      <AyahHeader
        surahTitle={route.params.surahdata.libraryName}
        navigation={navigation}
      />
      <FlatList
        style={[styles.listContainer, {minHeight: '80%'}]}
        data={ayahDataDisplay}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AyahListScreen;

const styles1 = StyleSheet.create({
  itemContainer: {
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
  ayatText1: {
    flex: 1,
    textAlign: 'right',
    fontSize: 24,
    fontFamily: 'Arial',
    lineHeight: 30,
    color: '#1A1A1A',
  },
  ayatIndex1: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 18,
    color: '#C7AA35',
  },
});
