import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  itemContainer: {
  marginLeft: 4,
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 5,
  // paddingLeft: 32,
  paddingTop: 16,
  borderColor:'#0b1a13', // if you need 
  overflow: 'hidden',
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.8,
  shadowRadius: 128,
  paddingHorizontal: 12,
  paddingBottom: 8, 
  marginVertical: 16,
  marginHorizontal: 4,
  display: 'flex',
  flex:1,
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "row",
  },
  surahType: {
    
    textAlign: "justify",
    fontSize: 16,
  },
  surahName:{
    textAlign: "justify",
    fontSize: 16,
  },
  surahIndex: {
    display:'flex',
    flexDirection: "row",
    marginRight:16,
    paddingTop:4,
    textAlign: "center",
    fontSize: 16,
    borderStyle: "solid",
    width:32,
    height:32,
    borderRadius: 10,
    borderWidth: 1,
  }
});
export default styles  ;

