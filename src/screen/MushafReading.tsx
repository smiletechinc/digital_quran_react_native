import React, { useEffect, useState } from 'react';
import { Text, View,} from 'react-native';
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

    useEffect(()=>{
        console.log("ayats:", ayats);
        // setBismillahAyah(ayats[0]);
    }, [ayats]);

       return (
         <View style={{marginTop:64}}>
              <Text style={styles.bismillahText}> {bismillahAyah}</Text>
            <View style={{display:"flex", justifyContent:"flex-start",
            flexDirection:"row-reverse", flexWrap:"wrap", borderStyle:"solid", borderWidth:2}}>
            {ayats && ayats.map((element,index) => 
            <View style={{display:"flex", justifyContent:"flex-start",
            flexDirection:"row-reverse", width:"auto"  , flexWrap:"wrap", marginLeft:4, paddingLeft: 4, borderStyle:"solid", borderWidth: 2}}>
                {index !== 0 && <Text style={{textAlign:"right", fontSize:16, display:'flex', flexDirection:"row"}}>{element}</Text>}
                {index !== 0 && <Text style={{borderStyle:"solid", borderRadius:20, color: "white", 
                borderWidth:2,textAlign: "right", marginRight:4}}>{index}</Text>}
            </View>
            )}
            </View>
         </View>
         
       );
}

export default MushafReading;