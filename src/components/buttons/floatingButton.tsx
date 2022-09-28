import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {floatingButtonIcon} from '../../constants/images';

type IconButtonProps = {
  onPress?: any;
};

const FloatingButton: React.FunctionComponent<IconButtonProps> = props => {
  const {onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.iconButtonContainer}>
      <Image source={floatingButtonIcon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  iconButtonContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
    bottom: 16,
    backgroundColor: '#009688',
    borderRadius: 25,
  },
  icon: {
    resizeMode: 'cover',
    width: 24,
    height: 24,
  },
});
