import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation/index';
import Initial from '../screens/Initial';
import SignIn from '../screens/SignIn';
import SignUpStackNavigation from './signUp';
import MainTabNavigation from './main';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/* <RootStack.Screen name="Initial" component={Initial} />
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="SignUpNav" component={SignUpStackNavigation} /> */}
        <RootStack.Screen name="MainNav" component={MainTabNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
