import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import Initial from '../screens/Initial';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import SignupStackNavigation from './signup';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation(){
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName="Initial"
      >
        <RootStack.Screen name="Initial" component={Initial} />
        <RootStack.Screen name="Signin" component={Signin} />
        <RootStack.Screen name="Signup" component={SignupStackNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

