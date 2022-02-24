import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, FlatList,ScrollView} from 'react-native';
import StyledText from 'react-native-styled-text';
import Quran from '../resources/SurahIndex';
import {styles, textStyles} from './index';
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
    const [mushafState, setMushafState] = useState(true);

    console.log("routeParams: ", route.params);
    console.log("index:", index);

    const MushafNavigation = () => {  
      if(mushafState){
        setMushafState(false);
      } else { setMushafState(true);}
     
      // navigation.navigate('MushafReading', route.params);
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
      }, [navigation, mushafState]);
      
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

          
        mushafState ?  <View style={styles.readingcontainer}>
           <Text style={[styles.bismillahText, {justifyContent:"center", alignSelf:"center"}]}> {bismillahAyah}</Text>
           <FlatList style = { styles.listDetailContainer }
               data = { surahData }
               renderItem = {renderItem}
           />
      </View>
      :
        <ScrollView style={{marginTop: 64}}>
        <Text style={styles.bismillahText}> {bismillahAyah}</Text>
         <View style={styles.mushafView}>
            <Text style={styles.nestedText}>
           {surahData && surahData.map((element,index) =>  
           {
             if(index>0) {
             return(
                 <StyledText textStyles={textStyles}>
                {`${element} <demo>${index} </demo>`}
                </StyledText>
             )
             }
           }
           )}
          </Text>
         </View>
         </ScrollView>
      
    );
}

export default SurahScreen;