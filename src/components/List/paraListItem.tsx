import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from './index';
import {useTranslation} from 'react-i18next';

type Props = {
  parah: any;
  onPress: any;
};

const ParaListItem: React.FunctionComponent<Props> = props => {
  const {parah, onPress} = props;
  const {t} = useTranslation();

  return (
    <View style={[styles.gridView]}>
      <View style={styles.circleView}>
        <Text style={styles.circleText}>{Number(parah.paraIndex)}</Text>
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
                left: 28,
              }}>
              <Text style={[styles.surahName]}>{t(parah.title)}</Text>
              <Text style={styles.surahType}>{`${parah.count} verses`}</Text>
            </View>
            <View
              style={{
                minWidth: '54%',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                backgroundColor: 'rgba(0,180,172,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 4,
                // paddingTop: 24,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  color: '#00B4AC',
                  fontSize: 24,
                  lineHeight: 36,
                }}>
                {parah.titleArabic}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ParaListItem;
