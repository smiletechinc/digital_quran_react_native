import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80, 
    },
    splashText: {
        color:'#000000', marginTop:8, marginLeft:8, fontSize:32
    },
    selectionContainer: {
        flex: 1, backgroundColor: "#57BBC1", 
    },
    readingcontainer: {
        flex: 1,
        paddingLeft: 0,
        backgroundColor: '#ffff',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: 100,
    },
    listContainer: {
        width: '100%',
        paddingleft: 64,
        marginTop: 100,
      },
    listDetailContainer: {
        width: '100%',
        paddingleft: 64,
      },
    itemContainer: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        // paddingLeft: 32,
        paddingTop: 16,
        borderColor:'#ff00ff', // if you need 
        overflow: 'hidden',
        shadowColor: '#0b1a13',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 128,
        paddingHorizontal: 12,
        paddingBottom: 8, 
        marginVertical: 4,
        marginHorizontal: 4,
        display: 'flex',
        flex:1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "row",
        },
    itemText: {
       flex: 1,
       textAlign: "right",
        fontSize: 16,
    },
    bismillahText:{
        // justifyContent: "center",
        // alignItems: "center",
       textAlign: "center",
       marginHorizontal: 16,
       marginVertical: 16,
        fontSize: 32,
    }
});

export default styles  ;