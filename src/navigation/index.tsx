import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import Initial from '../screens/Initial';
import Signin from '../screens/Signin';
import SignupStackNavigation from './signup';
import { RootState } from '@base/modules';

import styled from 'styled-components/native';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const isSignin = useSelector((state: RootState) => state.signin.isSignin);
  console.log('isSignin: ', isSignin);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {isSignin ? (
          <Main>{'Main'}</Main>
        ) : (
          <>
            <RootStack.Screen name="Initial" component={Initial} />
            <RootStack.Screen name="Signin" component={Signin} />
            <RootStack.Screen name="Signup" component={SignupStackNavigation} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: any){
  navigationRef.current?.navigate(name, params);
}

const Main = styled.View``;