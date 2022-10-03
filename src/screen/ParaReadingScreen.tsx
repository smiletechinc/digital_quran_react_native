import React, {useEffect, useState} from 'react';
import {TextInput, View, FlatList, Image} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import ScreenWrapperWithHeader from '../components/wrapper/HeaderWrapper';
import {StatusBar} from 'expo-status-bar';
import {ParaContext, ParaContextType} from '../context/paraContext';
import ParaListItem from '../components/List/paraListItem';
import {searchIcon} from '../constants/images';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: any;
  route: any;
  reduxSurahs: any;
  reduxParahs: any;
  updated: boolean;
};

let updatedOuter = false;

const ParaReadingScreen: React.FunctionComponent<Props> = props => {
  const {navigation, route, reduxSurahs, reduxParahs, updated} = props;
  const [paraIntro, setParaIntro] = useState([]);
  const [textValue, setChangeText] = React.useState('');
  const {setParaObject} = React.useContext(ParaContext) as ParaContextType;
  const {t} = useTranslation();

  useEffect(() => {
    setParaIntro(Object.values(reduxParahs));
  }, [navigation]);

  const moveFunction = (paraData: any) => {
    setParaObject(paraData);
    navigation.navigate('ParaDetailScreen');
  };
  const renderItem = ({item}: any) => {
    return <ParaListItem parah={item} onPress={() => moveFunction(item)} />;
  };

  return (
    <ScreenWrapperWithHeader
      title="Digital Quran"
      navigation={navigation}
      hideBackButton={true}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#00B4AC',
          },
        ]}>
        <View
          style={styles.searchBarView}
          onTouchEnd={() => navigation.navigate('Search')}>
          <TextInput
            value={textValue}
            onChangeText={text => setChangeText(text)}
            placeholder={t('search here')}
          />
          <Image source={searchIcon} />
        </View>
        <FlatList
          style={{
            paddingRight: 32,
            paddingLeft: 16,
          }}
          data={paraIntro}
          renderItem={renderItem}
        />
      </View>
      <StatusBar style="light" backgroundColor="#00B4AC" />
    </ScreenWrapperWithHeader>
  );
};

const mapStateToProps = (state: {
  surahs: {surahs: any};
  verses: {verses: any};
  parahs: {parahs: any};
}) => {
  return {
    reduxParahs: state.parahs.parahs,
    updated: !updatedOuter,
  };
};

export default connect(mapStateToProps)(ParaReadingScreen);
