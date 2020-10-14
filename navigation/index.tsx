import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Props } from '../types/index';
import Initial from '../screens/Initial';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation(){
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Initial">
        <RootStack.Screen name="Initial" component={Initial} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

