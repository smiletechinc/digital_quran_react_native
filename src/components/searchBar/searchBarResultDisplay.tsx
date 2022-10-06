import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SearchAyahHook} from '../../hooks/searchHook';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {SearchList} from '../../components/List/index';
import {ClipboardHook} from '../../hooks/clipboardHook';
import {SearchContext, SearchContextType} from '../../context/searchContext';

const SearchBarDisplayResult = () => {
  const {startAnimation, characters} = React.useContext(
    SearchContext,
  ) as SearchContextType;
  const {copyToClipboard} = ClipboardHook();

  const renderItem = ({item}: any) => {
    console.log('item', item);
    return (
      <SearchList surah={item} onPress={() => copyToClipboard(item.ayatText)} />
    );
  };

  return (
    <View>
      {startAnimation ? (
        <ContentLoader
          speed={1.8}
          backgroundColor={'#ffffff'}
          foregroundColor={'#999'}
          viewBox="0 26 360 70">
          <Rect x="30" y="0" rx="4" ry="8" width="300" height="48" />
          <Rect x="30" y="64" rx="4" ry="4" width="300" height="48" />
          <Rect x="30" y="128" rx="4" ry="4" width="300" height="48" />
          <Rect x="30" y="192" rx="4" ry="4" width="300" height="48" />
          <Rect x="30" y="256" rx="4" ry="4" width="300" height="48" />
        </ContentLoader>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={characters}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default SearchBarDisplayResult;

const styles = StyleSheet.create({
  listContainer: {minHeight: '85%'},
});
