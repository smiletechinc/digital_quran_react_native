import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  itemCheck: boolean;
  itemName: string;
  itemIndex: number;
  itemChangeFunc: any;
};

const BottomViewList: React.FunctionComponent<Props> = props => {
  const {itemName, itemCheck, itemChangeFunc, itemIndex} = props;
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.mainView}>
        <CheckBox
          disabled={itemCheck ? true : false}
          value={itemCheck}
          onValueChange={newValue => itemChangeFunc(itemIndex, newValue)}
          boxType="square"
        />
        <View style={{left: '32%'}}>
          <Text>{itemName}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BottomViewList;
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    marginTop: '4%',
    display: 'flex',
    flexDirection: 'row',
  },
});
