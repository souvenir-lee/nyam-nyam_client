import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpStackParamList } from '@base/types/SignUpNavigation';
import SignUpAddress from '@base/screens/SignUpAddress';

const SignUpStack = createStackNavigator<SignUpStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <SignUpStack.Navigator
        headerMode="screen"
        screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>
        <SignUpStack.Screen
          name="SignUpAddress"
          component={SignUpAddress}
          options={{ headerTitle: '가게 등록하기' }}
        />
      </SignUpStack.Navigator>
    </NavigationContainer>
  );
}
