import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  primaryButtonContainer: {
    width: '70%',
    borderRadius: 25,
    alignSelf: 'center',
  },
  linearGradientStyle: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonContainer: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31A8A8',
    marginLeft: 50,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  textbuttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31A8A8',
  },
  iconButtonContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    right: 32,
    bottom: 32,
    backgroundColor: '#009688',
    borderRadius: 25,
  },
  icon: {
    resizeMode: 'cover',
    width: 24,
    height: 24,
  },
});
export default styles;
