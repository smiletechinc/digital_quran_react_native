import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {SplashScreen,LandingScreen,HomeScreen, SurahScreen} from '../screen/index';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

    return(
       <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen  name="SplashScreen" component={SplashScreen} options={{ header: () => null}} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{title: "", header: ()=>null}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: "Quran"}}/>
        <Stack.Screen name="SurahScreen" component={SurahScreen} options={{title: "Quran"}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default RootNavigator;