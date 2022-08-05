import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './index';
import i18n from '../localization/i18n';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../buttons';
import DropDownPicker from 'react-native-dropdown-picker';
import CountryFlag from 'react-native-country-flag';
import {
  LanguageContext,
  LanguageContextType,
} from '../../context/languageContext';

type PickerProps = {
  onPress: any;
};
const LanguagePicker: React.FunctionComponent<PickerProps> = props => {
  const {t} = useTranslation();
  const {onPress} = props;
  const [currentLanguage, setLanguage] = useState('');
  const {textLanguage, setTextLanguage} = React.useContext(
    LanguageContext,
  ) as LanguageContextType;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      icon: () => <CountryFlag isoCode="UM" size={25} />,
      label: 'English',
      value: 'en',
    },
    {
      icon: () => <CountryFlag isoCode="IR" size={25} />,
      label: 'عربي',
      value: 'ar',
    },
    {
      icon: () => <CountryFlag isoCode="PK" size={25} />,
      label: 'اردو',
      value: 'ur',
    },
    {
      icon: () => <CountryFlag isoCode="IN" size={25} />,
      label: 'हिन्दी',
      value: 'hi',
    },
  ]);

  console.log(t);

  const proceedToChangeLanguage = (value: any) => {
    console.log('value', value);
    i18n
      .changeLanguage(value)
      .then(() => {
        console.log('value', value);
        setLanguage(value);
        setTextLanguage(value);
      })
      .catch(err => console.log(err));
  };

  return (
    <View>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          autoScroll={true}
          style={{
            borderColor: '#1CB4AC',
            borderRadius: 10,
            borderWidth: 1,
            alignSelf: 'center',
          }}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={`${items[0].label}`}
          onChangeValue={value => {
            proceedToChangeLanguage(value);
          }}
          dropDownContainerStyle={{
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: '#1CB4AC',
            marginTop: 8,
            borderRadius: 10,
          }}
          showArrowIcon={true}
          showTickIcon={true}
        />
      </View>
      <PrimaryButton title={t('next')} onPress={onPress} />
    </View>
  );
};

export default LanguagePicker;
