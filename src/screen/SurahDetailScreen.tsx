import React, { useEffect, useState } from 'react';
import { Text, View, FlatList,ScrollView} from 'react-native';
import Quran from '../resources/SurahIndex';
import {styles} from './index';
import {MushafButton} from '../components/buttons/index';

const MushafImage = require("../resources/images/MushafMode.png");

type Props = {
    navigation: any;
    route: any;
   
  }
const SurahScreen:React.FunctionComponent<Props> = (props) => {

    const {navigation, route} = props;
    const {index} = route.params;
    const [surahData, setSurahData] = useState<string[]>();
    const [bismillahAyah, setBismillahAyah] = useState();
    console.log("routeParams: ", route.params);
    console.log("index:", index);

    const MushafNavigation = () => {  
      navigation.navigate('MushafReading', route.params);
  } 

    const surrahSelect = (index) => {
      console.log("surrahSelect:", index);  
      if (index === null) {
        return Quran.name
      }
      return Quran.name[index];
    };

    useEffect(()=>{
          navigation.setOptions({
          headerStyle: {
            backgroundColor: '#57BBC1'
          },
          title:`${route.params.titleArabic}`,
          headerRight: () => (
            <MushafButton icon={MushafImage} onPress={MushafNavigation}/>
          ),
        });
          const ayats:object = surrahSelect(Number(route.params.index)).verse;
          console.log("ayats:", Object.values(ayats));
          if(Number(route.params.index)===1){
            setBismillahAyah(ayats['verse_1']);
          }
          else{
            setBismillahAyah(ayats['verse_0']);
          }
          setSurahData(Object.values(ayats));  
      }, [navigation]);
      
     console.log("SurahData: ",surahData)

     const renderItem = ({item, index}) => {
       if(index>0){
        return(
          <View style={styles.itemContainer}>
            <Text>{index}</Text>
             <Text style={styles.itemText}>{item}</Text>
          <Text>{}</Text>
          </View>
         
             )
       }     
       }
       return (
         <View style={styles.readingcontainer}>
              <Text style={styles.bismillahText}> {bismillahAyah}</Text>
              <FlatList style = { styles.listDetailContainer }
                  data = { surahData }
                  renderItem = {renderItem}
              />
         </View>
         
       );
}

export default SurahScreen;