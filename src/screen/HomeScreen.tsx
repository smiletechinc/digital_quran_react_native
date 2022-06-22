import React, { useEffect, useState } from 'react';
import { Text, View, FlatList} from 'react-native';
import {styles} from './index';
import surahMeta from '../resources/surahMeta.json';
import {ListItem} from '../components/List/index';

type Props = {
  navigation: any;
  route: any;
 
}

const HomeScreen: React.FunctionComponent<Props> = (props) => {
  const {navigation, route} = props;
  const [surahIntro, setSurahInto] = useState(surahMeta);

  // useEffect(()=>{
  //   navigation.setOptions({headerStyle: {
  //     backgroundColor: '#57BBC1'
  //   },title: "Quran"});
  // }, [navigation])
  
  const SampleFunction=(surahdata)=>{
    navigation.navigate('SurahScreen', surahdata);
}
const renderItem = ({item}) => {
    
   return(
            <ListItem 
                surah = {item}
                onPress = {() => SampleFunction(item)}
            />
        )
    }
  
  return (
    <View style={styles.container}>
        <FlatList style = { styles.listContainer }
       data = { surahIntro }
        renderItem = {renderItem}
     />
      </View>
  );
}

export default HomeScreen;  