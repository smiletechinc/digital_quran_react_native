import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  header_main_view: {
    justifyContent: 'center',
    backgroundColor: '#833471',
    alignItems: 'center',
  },
  header_profile_icon: {
    width: 29,
    height: 29,
    marginLeft: 5,
  },

  header_with_text_main_view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.020512,
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    color: '#E9EEF0',
    textAlign: 'center',
    lineHeight: 16,
  },
  main_view: {
    marginTop: '4%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  inner_main_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBakcButton: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    color: '#1CB4AC',
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  hijriDate: {
    right: '8%',
    height: 16,
  },
  englishDate: {
    right: '8%',
    height: 16,
    alignSelf: 'flex-end',
  },
  timerView: {
    right: '10%',
    height: 16,
    alignSelf: 'flex-end',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
  timerText: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    color: '#FFFFFF',
  },
});
export default styles;
