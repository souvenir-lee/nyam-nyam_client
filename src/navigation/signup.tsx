import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpParamList } from '../types/Navigation/SignUpNavigation';
import SignUp from '../screens/Signup';
import SignUpAddress from '../screens/SignUpAddress';

const SignupStack = createStackNavigator<SignUpParamList>();

export default function SignUpStackNavigation() {
  return (
    <SignupStack.Navigator>
      <SignupStack.Screen name="SignUp" component={SignUp} />
      <SignupStack.Screen name="SignUpAddress" component={SignUpAddress} />
    </SignupStack.Navigator>
  );
}
