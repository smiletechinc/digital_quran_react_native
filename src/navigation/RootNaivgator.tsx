import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SplashScreen,LandingScreen,HomeScreen, SurahScreen, MushafReading} from '../screen/index';
import {TopicsScreen, SearchingScreen,SettingScreen} from '../screen/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const Tab = createBottomTabNavigator();
  function HomeTabs() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Reading') {
            iconName = focused
              ? 'ios-reader-outline'
              : 'ios-reader-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search-outline' : 'ios-search-outline';
          } else if (route.name === 'Topics') {
            iconName = focused ? 'ios-bookmarks-outline' : 'ios-bookmarks-outline'; 
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#57BBC1',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Reading" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchingScreen} />
        <Tab.Screen name="Topics" component={TopicsScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    );
  }

    return(
       <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen  name="SplashScreen" component={SplashScreen} options={{ header: () => null}} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{title: "", header: ()=>null}}/>
        <Stack.Screen name="HomeScreen" component={HomeTabs} options={{headerStyle: {
            backgroundColor: '#57BBC1'
          },title: "Quran"}}/>
        <Stack.Screen name="SurahScreen" component={SurahScreen} options={{title: ""}}/>
        <Stack.Screen name="MushafReading" component={MushafReading} options={{title:""}}/>

      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default RootNavigator;