import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {floatingButtonIcon, searchByImageIcon} from '../../constants/images';
import {FloatingAction} from 'react-native-floating-action';

type IconButtonProps = {
  onPressImage?: any;
};

const FloatingButton: React.FunctionComponent<IconButtonProps> = props => {
  const {onPressImage} = props;
  const actions = [
    {
      text: 'Search By Image',
      icon: require('../../resources/images/imageBySearchIcon.png'),
      name: 'image',
      position: 1,
      color: '#009688',
    },
  ];

  const itemPressed = (btnName: any) => {
    if (btnName === 'image') {
      onPressImage();
    }
  };

  return (
    <FloatingAction
      actions={actions}
      position="right"
      onPressItem={name => {
        itemPressed(name);
      }}
      // style={{backgroundColor: '#009688'}}
      color="#009688"
      distanceToEdge={0}
      floatingIcon={floatingButtonIcon}
      iconHeight={28}
      iconWidth={28}
    />
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    //   marginTop: '10%',
    // zIndex: 500,
    borderWidth: 2,
    flex: 1,
    // flexDirection: 'row',
    display: 'flex',
    // position: 'absolute',
  },
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
