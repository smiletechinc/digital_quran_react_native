import React from "react";
import {View, StyleSheet, Image} from 'react-native';
import {styles} from './index'

const LogoImage = () => {
    return(
    <View style={styles.container}>
       <Image source={require('../../resources/images/AppIcon.png')}
       style={styles.LogoImage} />
    </View>
    )
}

export default LogoImage;