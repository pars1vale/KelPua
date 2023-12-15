import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Homepage,
  Favorite,
  Order,
  DestinationDetail,
  Search,
  Profile,
  AddFoodForm,
  EditDestinationForm,
  SplashScreen,
  Register,
  Login,
} from '../screens';
import { Home, SearchNormal, Heart, ProfileCircle } from 'iconsax-react-native';
import theme, { COLORS } from '../constant';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 20,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 10,
          fontSize: 13,
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Home
              color={color}
              variant={focused ? 'Broken' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <SearchNormal
              color={color}
              variant={focused ? 'Broken' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ focused, color }) => (
            <Heart
              color={color}
              variant={focused ? 'Broken' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <ProfileCircle
              color={color}
              variant={focused ? 'Broken' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="SearchPage"
        component={Search}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFoodForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditDestination"
        component={EditDestinationForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Router;
