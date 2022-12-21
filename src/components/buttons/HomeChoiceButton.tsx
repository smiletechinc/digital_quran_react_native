import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {backgroundAppImage, selectionIcon} from '../../constants/images';
import {useTranslation} from 'react-i18next';

type IconButtonProps = {
  surahSelectIconVisible: boolean;
  setSurahSelectIconVisible: any;
  paraSelectIconVisible: boolean;
  setParaSelectIconVisible: any;
  paraPress: any;
  surahPress: any;
};

const HomeChoiceButton: React.FunctionComponent<IconButtonProps> = props => {
  const {
    surahSelectIconVisible,
    setSurahSelectIconVisible,
    paraSelectIconVisible,
    setParaSelectIconVisible,
    paraPress,
    surahPress,
  } = props;
  const {t} = useTranslation();
  const selectFunction = () => {
    setSurahSelectIconVisible(true);
    setParaSelectIconVisible(false);
    surahPress();
  };
  return (
    <View style={{top: '4%'}}>
      <View>
        <Text style={styles.selectionLanguageText}>
          {t('select option search')}
        </Text>
      </View>
      <View style={styles.homechoiceButtonView}>
        <TouchableOpacity style={styles.homeScreenButton} onPress={paraPress}>
          {paraSelectIconVisible && (
            <View style={styles.homeScreenImageView}>
              <Image source={selectionIcon} />
            </View>
          )}

          <View
            style={{
              alignSelf: 'center',
            }}>
            <Text style={styles.homeScreenText}>{t('para')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeScreenButton}
          onPress={() => {
            selectFunction();
          }}>
          {surahSelectIconVisible && (
            <View style={styles.homeScreenImageView}>
              <Image source={selectionIcon} />
            </View>
          )}
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.homeScreenText}>{t('surah')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeChoiceButton;

const styles = StyleSheet.create({
  selectionLanguageText: {
    color: '#3B3B3B',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 65,
    top: 8,
    fontWeight: '400',
  },
  homechoiceButtonView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
