import React, { useState } from "react";
import { View, Text} from "react-native";
import { styles } from "./index";
import { Picker } from "@react-native-picker/picker";
import i18n from '../localization/i18n';  
import {useTranslation} from 'react-i18next';
import { PrimaryButton } from "../buttons";

type PickerProps = {
  onPress: any;
}
const LanguagePicker:React.FunctionComponent<PickerProps> = (props) => {

  const { t } = useTranslation();
  const {onPress} = props;
  const [currentLanguage,setLanguage] =useState('en');
  console.log(t);
  const proceedToChangeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };  

  return (
    <View style={{flex:1}}> 
      <View style={styles.container}>
        <Picker
          selectedValue={currentLanguage}
          onValueChange={(value, index) => proceedToChangeLanguage(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select language" value="en" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Arabic" value="ar"/>
          <Picker.Item label="Urdu" value="ur" />
          <Picker.Item label="Hindi" value="hi" />
        </Picker>
      </View>
      <PrimaryButton title={t('next')} onPress={onPress} />
    </View>
  );
}

export default LanguagePicker;