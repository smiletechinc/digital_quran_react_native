import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  TopicsScreen,
  SearchingScreen,
  SettingScreen,
  HomeScreen,
  SurahScreen,
} from '../screen/index';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const TopicStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();
const TabBarNavigation = () => {
  // function HomehTab() {
  //     return(
  //     <HomeStack.Navigator initialRouteName="SplashScreen">
  //         <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
  //     </HomeStack.Navigator>
  //     );
  //   }
  function SearchTab() {
    return (
      <SearchStack.Navigator initialRouteName="SplashScreen">
        <SearchStack.Screen
          name="SearchingScreen"
          component={SearchingScreen}
        />
      </SearchStack.Navigator>
    );
  }

  function TopicTab() {
    return (
      <TopicStack.Navigator initialRouteName="SplashScreen">
        <TopicStack.Screen
          name="TopicScreen"
          component={TopicsScreen}
          options={{header: () => null}}
        />
      </TopicStack.Navigator>
    );
  }

  function SettingTab() {
    return (
      <SettingStack.Navigator initialRouteName="SplashScreen">
        <SettingStack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{header: () => null}}
        />
      </SettingStack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Reading') {
            iconName = focused ? 'ios-reader' : 'ios-reader';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'ios-settings' : 'ios-settings';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search';
          } else if (route.name === 'Topics') {
            iconName = focused ? 'ios-bookmarks' : 'ios-bookmarks';
          }

          // Ionicons.loadFont().then();
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#57BBC1',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Reading" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchTab} />
      <Tab.Screen name="Topics" component={TopicTab} />
      <Tab.Screen name="Setting" component={SettingTab} />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
