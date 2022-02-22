import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { styles } from './index';

type IconButtonProps = {
  onPress: any;
  icon: ImageSourcePropType;
}

const MushafButton: React.FunctionComponent<IconButtonProps> = ( props ) => {
  const {onPress, icon} = props;
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}  >
            <Image source={icon}
                  style={styles.icon} /> 
        </TouchableOpacity>
    )
}

export default MushafButton;