import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {SCREEN_WIDTH} from '../constants/index';
import {TextButton} from '../components/buttons';
import TextInputModel from './textInputModel';
import {FirebaseDataHook} from '../hooks/useFirebaseDataHook';
import {BottomViewList} from '../components/List/index';
import {
  BookmarkVerseContext,
  BookmarkVerseContextType,
} from '../context/favouriteVerseContext';
import {Separator} from 'react-native-btr';

type Props = {
  onCreateButton?: any;
  onDoneButton?: any;
  onCancelButtonFunc?: any;
  ayatId?: string;
  userId?: string;
};

const BookmarkOptionModel: FunctionComponent<Props> = props => {
  const {onCreateButton, ayatId, onCancelButtonFunc, userId, onDoneButton} =
    props;
  const [createTextModelVisible, setCreateTextModelVisible] = useState(false);
  const [listData, setListData] = useState<any>({});
  const {fetchBookmark, fetchBookObject, updateAyatInBookmark} =
    FirebaseDataHook();
  const {updateVerseBookLibrary, favoriteVerses} = React.useContext(
    BookmarkVerseContext,
  ) as BookmarkVerseContextType;

  useEffect(() => {
    if (Object.values(favoriteVerses).length > 0) {
      const arr: any[] = Object.values(favoriteVerses).map((element: any) => {
        if (
          element.libraryData &&
          Object.values(element.libraryData).includes(ayatId)
        ) {
          const a = {name: element.libraryName, isCheck: true};
          return a;
        } else {
          const a = {name: element.libraryName, isCheck: false};
          return a;
        }
      });
      setListData(arr);
    }
  }, [favoriteVerses]);

  const onCancelButton = () => {
    setCreateTextModelVisible(false);
    onCancelButtonFunc();
  };

  const checkFunction = (itemIndex: number, isCheck: boolean) => {
    console.log('itemIndex', itemIndex);
    console.log('isCheck', isCheck);
    console.log('product', Object.values(fetchBookObject));
    Object.values(favoriteVerses).map((product: any, index: number) => {
      if (itemIndex === index && isCheck) {
        if (product.libraryData != undefined) {
          var arr: any[] = product.libraryData;
          arr = arr.concat(ayatId);
          console.log('product', product);
          updateAyatInBookmark(product.id, arr);
        } else {
          var arrayUpdate: any[] = [ayatId];
          updateAyatInBookmark(product.id, arrayUpdate);
        }
      }
    });
  };

  const renderItem = ({item, index}: any) => {
    return (
      <BottomViewList
        itemName={item.name}
        itemCheck={item.isCheck}
        itemIndex={index}
        itemChangeFunc={checkFunction}
      />
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <TextButton
          title="+ NEW AYATLIST"
          onPress={() => setCreateTextModelVisible(true)}
        />
        <TextButton title="Done" onPress={onDoneButton} />
      </View>
      <View style={styles.flatView}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          // overScrollMode="auto"
        />
      </View>
      {createTextModelVisible && (
        <TextInputModel
          visible={createTextModelVisible}
          onAcceptButton={onCreateButton}
          onCancelButton={() => onCancelButton()}
        />
      )}
    </View>
  );
};

export default BookmarkOptionModel;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: SCREEN_WIDTH * 0.95,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  headerView: {
    display: 'flex',
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
    // paddingBottom: '8%',
  },
  flatView: {
    paddingHorizontal: '4%',
    minWidth: '90%',
    left: '4%',
    marginTop: '2%',
    maxHeight: '75%',
  },
  TextInput: {
    marginLeft: 20,
    borderBottomWidth: 1,
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
  },
});
