import * as React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Home from './src/screens/Home';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="DetailScreen" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// import * as React from 'react';
// import { Detail } from './src/screens';
// export default function App() {
//   return <Detail />;
// }
// import * as React from 'react';
// import { Article } from './src/screens';
// export default function App() {
//   return <Article />;
// }