import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  surah: any;
  onPress?: any;
};

const SearchList: React.FunctionComponent<Props> = props => {
  const {surah, onPress} = props;
  const {t} = useTranslation();

  return (
    <View style={[styles.gridView]}>
      <View style={styles.itemContainer}>
        <Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              fontSize: 20,
              fontFamily: 'Arial',
              color: '#1A1A1A',
            }}
            onPress={onPress}>
            {surah.ayatText}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              marginVertical: 4,
              fontSize: 20,
              color: '#C7AA35',
            }}>{` (${surah.surahNumber}:${surah.ayatNumber})`}</Text>
        </Text>
      </View>
    </View>
  );
};

export default SearchList;
const styles = StyleSheet.create({
  gridView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: 'transparent',
    paddingHorizontal: 22,
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#707070',
    backgroundColor: 'rgba(255,255,255,0.795)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 24,
    borderWidth: 2,
  },
});
