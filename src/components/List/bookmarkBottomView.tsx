import React, {useState} from 'react';
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
  const [itemValue, setItemValue] = useState(itemCheck);

  return (
    // <ScrollView showsVerticalScrollIndicator={true}>
    <View style={styles.mainView}>
      <CheckBox
        disabled={itemValue ? true : false}
        value={itemValue}
        onValueChange={newValue => {
          setItemValue(newValue), itemChangeFunc(itemIndex, newValue);
        }}
        boxType="square"
        style={{borderWidth: 2, borderColor: 'red'}}
      />
      <View style={{left: '32%'}}>
        <Text>{itemName}</Text>
      </View>
    </View>
    // </ScrollView>
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
