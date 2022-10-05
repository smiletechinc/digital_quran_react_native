import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {styles} from './index';
import {useTranslation} from 'react-i18next';
import {makkahImage, madinaIamge} from '../../constants/images';

type Props = {
  surah: any;
  onPress: any;
};

const ListItem: React.FunctionComponent<Props> = props => {
  const {surah, onPress} = props;
  const {t} = useTranslation();
  console.log('surah', surah);
  return (
    <View style={[styles.gridView]}>
      <View style={styles.circleView}>
        <Text style={styles.circleText}>{Number(surah.index)}</Text>
      </View>
      <View style={styles.circleView1}>
        <Image
          source={surah.type === 'Madaniyah' ? madinaIamge : makkahImage}
          style={{resizeMode: 'center', width: 100, height: 100}}
        />
        {/* <Text style={styles.circleText1}>HI</Text> */}
      </View>
      <View style={styles.rectangleView}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <View
              style={{
                display: 'flex',
                borderStyle: 'solid',
                alignItems: 'center',
                justifyContent: 'center',
                left: 32,
              }}>
              <Text style={styles.surahName}>{t(surah.title)}</Text>
              <Text style={styles.surahType}>{`${surah.count} verses`}</Text>
            </View>
            <View
              style={{
                minWidth: '56%',
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
                  color: '#00B4AC',
                  fontSize: 24,
                  lineHeight: 36,
                }}>
                {surah.titleArabic}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
