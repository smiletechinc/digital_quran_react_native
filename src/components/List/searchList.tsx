import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {styles} from './index';
import {useTranslation} from 'react-i18next';

type Props = {
  surah: any;
  onPress?: any;
};

const SearchList: React.FunctionComponent<Props> = props => {
  const {surah, onPress} = props;
  const {t} = useTranslation();

  useEffect(() => {
    console.log('surah', surah);
  });
  return (
    <View style={[styles.gridView]}>
      <View style={styles.rectangleView}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <View
              style={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                backgroundColor: 'rgba(0,180,172,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 4,
                paddingVertical: 24,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 16,
                }}>
                {surah}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
    // paddingLeft: SCREEN_WIDTH * 0.,
  },
  rectangleView: {
    display: 'flex',
    flex: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#707070',
    backgroundColor: '#FFFFFF',
    marginLeft: 32,
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    // flexDirection: 'row',
    // height: 80,
  },
  // surahType: {
  //   textAlign: 'justify',
  //   fontSize: 8,
  //   color: '#1D2226',
  // },
  // surahName: {
  //   textAlign: 'justify',
  //   fontSize: 16,
  //   color: 'black',
  // },
  // surahIndex: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   marginRight: 16,
  //   paddingTop: 4,
  //   textAlign: 'center',
  //   fontSize: 16,
  //   borderStyle: 'solid',
  //   width: 32,
  //   height: 32,
  //   borderRadius: 10,
  //   borderWidth: 1,
  // },
});
