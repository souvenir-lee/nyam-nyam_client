import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';
import { SignupParamList } from '../types';
import Signup from '../screens/Signup';
import SignUpAddress from '../screens/SignUpAddress';
import { MINT } from '@base/baseColors';

const SignupStack = createStackNavigator<SignupParamList>();

export default function SignupStackNavigation() {
  return (
    <SignupStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 0,
        },
      }}>
      <SignupStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            width: 50,
          },
        }}
      />
      <SignupStack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '가게 등록',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            width: 50,
          },
          headerTitleStyle: {
            color: MINT,
            fontSize: 22,
            fontFamily: 'BMHANNA',
          },
          headerBackTitleVisible: false,
        }}
      />
    </SignupStack.Navigator>
  );
}
