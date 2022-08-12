import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Text, SafeAreaView} from 'react-native';
import {styles} from './index';
import {LogoImage} from '../components/images/index';

type Props = {
  navigation: any;
};

const SplashScreen: React.FunctionComponent<Props> = props => {
  const {navigation} = props;
  const [animating, setAnimating] = useState(false);

  navigation.setOptions({
    styles: {backgroundColor: 'red'},
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimating(true);
      navigation.replace('LandingScreen');
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#00B4AC'}]}>
      <View>
        <View>
          <LogoImage />
          <Text style={styles.splashText}>Digital Quran</Text>
          {
            <ActivityIndicator
              animating={animating}
              color="#FFFFFF"
              size="large"
              style={styles.activityIndicator}
            />
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
