import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {styles} from './index';

type PrimaryButtonProps = {
  title: string;
  onPress: any;
}
const PrimaryButton:React.FunctionComponent<PrimaryButtonProps>  = (props ) => {
  const {title, onPress} = props;
    return(
     <View>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.primaryButtonContainer}>
                <Text style={styles.secondaryButtonText}>{title}</Text>
            </View>
        </TouchableOpacity> 
    </View> 
    )
}

export default PrimaryButton;