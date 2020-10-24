import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupParamList } from '../types';
import Signup from '../screens/Signup';
import SignUpAddress from '../screens/SignUpAddress';

const SignupStack = createStackNavigator<SignupParamList>();

export default function SignupStackNavigation() {
  console.log('signup navigation');
  return (
    <SignupStack.Navigator>
      <SignupStack.Screen name="Signup" component={Signup} />
      <SignupStack.Screen name="SignUpAddress" component={SignUpAddress} />
    </SignupStack.Navigator>
  );
}
