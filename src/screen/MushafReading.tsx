import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView} from 'react-native';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import Quran from '../resources/SurahIndex';
import {styles} from './index';

type Props = {
    navigation: any;
    route: any;
   
  }
const MushafReading:React.FunctionComponent<Props> = (props) => {

    const {navigation, route} = props;
    const {index} = route.params;
    const [ayats, setAyats] = useState<string[]>();
    const [bismillahAyah, setBismillahAyah] = useState();
    console.log("routeParams: ", route.params);
    console.log("index:", index);

    const surrahSelect = (index) => {
      console.log("surrahSelect:", index);  
      if (index === null) {
        return Quran.name
      }
      return Quran.name[index];
    };
    useEffect(()=>{
          navigation.setOptions({headerStyle: {
            backgroundColor: '#57BBC1'
          },title:`${route.params.titleArabic}`});  
      }, [navigation]);
    
    useEffect(()=>{
        console.log(surrahSelect(Number(route.params.index)).verse.verse_1);
        if(Number(route.params.index)=== 1){
            setBismillahAyah(surrahSelect(Number(route.params.index)).verse.verse_1);
        }
        else{
            setBismillahAyah(surrahSelect(Number(route.params.index)).verse.verse_0);
        }
        console.log("BIsmillahAyat:",bismillahAyah);
        console.log("surrahSelect:", surrahSelect(Number(route.params.index)).verse);
        console.log("data:",Object.values(surrahSelect(Number(route.params.index)).verse))
        setAyats(Object.values(surrahSelect(Number(route.params.index)).verse));
    }, [route.params.index]);

       return (
         <ScrollView style={{marginTop: 64}}>
           <Text style={styles.bismillahText}> {bismillahAyah}</Text>
            <View style={{display:"flex", justifyContent:"flex-start",
            flexDirection:"row-reverse",width:"auto",flexWrap:"wrap", borderStyle:"solid", borderWidth:2}}>
            {ayats && ayats.map((element,index) =>  
              {
                if(index>0) {
                  return (
                    <View>
                   <Text style={{textAlign:"right", fontSize:16, }}>{element}</Text>
                   <Text style={{color: "black"}}>{index}</Text>
                   </View>
                  )
                }
              }
              )}
              {/* <Text style={{fontSize: 16, flex: 1, textAlign:"center"}} >Line 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              <Text>Line 2. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text>
              </Text> */}
            </View>
         </ScrollView>
       );
}

export default MushafReading;