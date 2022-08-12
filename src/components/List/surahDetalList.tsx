import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  verse: any;
  index: any;
  onPress?: any;
  isSurahFathia: any;
};

const SurahDetailList: React.FunctionComponent<Props> = props => {
  const {verse, onPress, index, isSurahFathia} = props;
  const {t} = useTranslation();

  useEffect(() => {
    console.log('surah', verse);
  });
  return (
    <View style={styles.itemContainer} onTouchEnd={onPress}>
      <Text style={styles.itemText}>{verse}</Text>
      <Text
        style={{
          right: 18,
          marginVertical: 4,
          fontSize: 20,
          color: '#C7AA35',
        }}>
        &#xFD3E;{isSurahFathia ? index + 2 : index + 1}&#xFD3F;
      </Text>
    </View>
  );
};

export default SurahDetailList;
const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 4,
    display: 'flex',
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
