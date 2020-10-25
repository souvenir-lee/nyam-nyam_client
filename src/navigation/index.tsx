import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@base/modules';

import { RootStackParamList } from '../types/Navigation/index';
import Initial from '../screens/Initial';
import SignIn from '../screens/SignIn';
import SignUpStackNavigation from './signup';
import MainTabNavigation from './main';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const isSignIn = useSelector((state: RootState) => state.signin.isSignin);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {isSignIn ? (
          <RootStack.Screen name="MainNav" component={MainTabNavigation} />
        ) : (
          <>
            <RootStack.Screen name="Initial" component={Initial} />
            <RootStack.Screen name="SignIn" component={SignIn} />
            <RootStack.Screen
              name="SignUpNav"
              component={SignUpStackNavigation}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
