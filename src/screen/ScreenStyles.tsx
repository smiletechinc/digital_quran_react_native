import {SCREEN_WIDTH} from '../constants/index';
import {Platform, StyleSheet} from 'react-native';

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
    color: '#FAFAFA',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '500',
  },
  languageAppText: {
    color: '#1CB4AC',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 65,
    top: 8,
    fontWeight: '500',
  },
  selectionLanguageText: {
    color: '#3B3B3B',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 65,
    top: 8,
    fontWeight: '400',
  },
  selectionContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? (SCREEN_WIDTH / 10) * 2 : 10,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
  },
  readingcontainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(112,112,112,0)',
    display: 'flex',
    flexDirection: 'row-reverse',
    width: 'auto',
    flexWrap: 'wrap',
    borderRadius: 16,
    marginTop: 64,
    alignContent: 'center',
    backgroundColor: 'rgba(112,112,112,0.14)',
  },
  listContainer: {},
  listDetailContainer: {
    width: '100%',
    paddingleft: 64,
  },
  itemContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 16,
    borderColor: '#ffffff',
    paddingHorizontal: 12,
    marginVertical: 4,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
  },
  bismillahText: {
    textAlign: 'center',
    marginTop: 32,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
    fontSize: 20,
  },
  textIndex: {
    fontSize: 20,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  nestedText: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mushafView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
    width: 'auto',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 64,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(112,112,112,0.14)',
  },
  homeScreenButton: {
    display: 'flex',
    flex: 1,
    paddingBottom: 36,
    marginLeft: 4,
    paddingTop: 36,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#707070',
    backgroundColor: 'rgba(59,59,59,0.5)',
  },
  homeScreenImageView: {
    position: 'absolute',
    right: 12,
    top: 8,
    alignSelf: 'flex-end',
  },
  homeScreenText: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 58,
    textAlign: 'center',
    color: '#ffffff',
  },
  tabsContainerStyle: {
    borderRadius: 24,
    padding: 2,
    backgroundColor: '#FFFFF',
  },
  tabStyle: {
    borderRadius: 24,
    borderColor: 'rgba(255,255,255,0)',
  },
  activeTabStyle: {
    backgroundColor: '#00B4AC',
  },
  tabTextStyle: {textAlign: 'left', fontSize: 16, color: '#00B4AC'},
  activeTabTextStyle: {
    textAlign: 'left',
    fontSize: 16,
    color: '#FFFFFF',
  },
  elementTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 40,
    color: '#FFFFFF',
    fontFamily: 'Arial',
  },
  indexViewStyle: {
    marginRight: 4,
    marginLeft: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderColor: '#C7AA35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C7AA35',
    textAlign: 'center',
  },
});

export default styles;
