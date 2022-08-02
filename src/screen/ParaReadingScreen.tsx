import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import {styles} from './index';
import {connect, useDispatch} from 'react-redux';
import {ListItem} from '../components/List/index';
import ScreenWrapperWithHeader from '../components/wrapper/HeaderWrapper';
import {StatusBar} from 'expo-status-bar';
import {SurahContext, SurahContextType} from '../context/surahContext';
import {ParaContext, ParaContextType} from '../context/paraContext';
import ParaListItem from '../components/List/paraListItem';

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
  const {setParaObject} = React.useContext(ParaContext) as ParaContextType;
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
      hideBackButton={false}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#00B4AC',
          },
        ]}>
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
// export default ParaReadingScreen;
