import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SplashScreen,
  LandingScreen,
  LandingScreenContainer,
  SigninScreen,
  SignupScreen,
  HomeScreen,
  SurahScreen,
  SuraReadingScreen,
  ParaReadingScreen,
  ParaDetailScreen,
  CameraSearchScreen,
  UserAccountScreen,
} from '../screen/index';
import {TopicsScreen, SearchingScreen, SettingScreen} from '../screen/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setStatusBarBackgroundColor} from 'expo-status-bar';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ParaStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#00B4AC',
  },
};

const RootNavigator = () => {
  function ReadingStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="SuraReadingScreen"
          component={SuraReadingScreen}
          options={{
            header: () => null,
          }}
        />
      </HomeStack.Navigator>
    );
  }

  function ParaStackScreen() {
    return (
      <ParaStack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <ParaStack.Screen
          name="ParaReadingScreen"
          component={ParaReadingScreen}
          options={{
            header: () => null,
          }}
        />
      </ParaStack.Navigator>
    );
  }

  function SearchStackScreen() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="home"
          component={SearchingScreen}
          options={{
            header: () => null,
          }}
        />
        <SearchStack.Screen
          name="CameraSearchScreen"
          component={CameraSearchScreen}
          options={{header: () => null}}
        />
      </SearchStack.Navigator>
    );
  }

  function ReadingTabs() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Surah') {
              iconName = focused ? 'ios-reader-outline' : 'ios-reader-outline';
            } else if (route.name === 'Para') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search-outline' : 'ios-search-outline';
            } else if (route.name === 'Topics') {
              iconName = focused
                ? 'ios-bookmarks-outline'
                : 'ios-bookmarks-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#57BBC1',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            // backgroundColor: "#000",
          },
        })}>
        <Tab.Screen name="Surah" component={ReadingStackScreen} />
        <Tab.Screen name="Para" component={ParaStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Topics" component={TopicsScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    );
  }

  function ParaReadingTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Para"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Surah') {
              iconName = focused ? 'ios-reader-outline' : 'ios-reader-outline';
            } else if (route.name === 'Para') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search-outline' : 'ios-search-outline';
            } else if (route.name === 'Topics') {
              iconName = focused
                ? 'ios-bookmarks-outline'
                : 'ios-bookmarks-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#57BBC1',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            // backgroundColor: "#000",
          },
        })}>
        <Tab.Screen name="Surah" component={ReadingStackScreen} />
        <Tab.Screen name="Para" component={ParaStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Topics" component={TopicsScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="LandingScreenContainer"
            component={LandingScreenContainer}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="SignIn"
            component={SigninScreen}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="SuraReadingScreen"
            component={ReadingTabs}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="ParaReadingScreen"
            component={ParaReadingTabs}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="SurahScreen"
            component={SurahScreen}
            options={{title: '', header: () => null}}
          />
          <Stack.Screen
            name="ParaDetailScreen"
            component={ParaDetailScreen}
            options={{title: '', header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
