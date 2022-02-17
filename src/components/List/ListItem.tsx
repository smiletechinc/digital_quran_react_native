import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './index'
import {useTranslation} from 'react-i18next';

type Props = {
    surah: any;
    onPress: any;
}

const ListItem: React.FunctionComponent<Props>= (props) => {
const {surah, onPress} = props;
const { t } = useTranslation();

    return (
        <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <Text style={styles.surahIndex}>{Number(surah.index)}.</Text>
          <Text style={styles.surahName}>{t(surah.title)}</Text>
          <Text style={styles.surahType}>{surah.type}</Text>
        </View>
      </TouchableOpacity> 
    );
}

export default ListItem;