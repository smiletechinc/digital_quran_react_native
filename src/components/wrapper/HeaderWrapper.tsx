// import React in our code
import React, {useState, useRef, useEffect, FunctionComponent} from 'react';

// import all the components we are going to use
import {StyleSheet, View} from 'react-native';
import HeaderWithText from '../Header/header';
import {MULTIPLIER, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  title: string;
  navigation: any;
  route?: any;
  children?: any;
  hideBackButton?: boolean;
  overrideStyle?: any;
};

const ScreenWrapperWithHeader: FunctionComponent<Props> = props => {
  const {title, children, navigation, hideBackButton, overrideStyle} = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.header_view, overrideStyle]}>
        <HeaderWithText
          text={title}
          navigation={navigation}
          hideBackButton={hideBackButton}
        />
      </View>
      <View>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default ScreenWrapperWithHeader;

const styles = StyleSheet.create({
  header_view: {
    justifyContent: 'flex-start',
    backgroundColor: '#00B4AC',
    paddingTop: STATUS_BAR_HEIGHT * 0.95,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
});
