import {MULTIPLIER, SCREEN_WIDTH} from '../../constants/index';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppImageHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: Platform.OS === 'ios' ? MULTIPLIER * 64 : 10,
  },
});

export default styles;
