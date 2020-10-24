import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../types/index';
import Initial from '../screens/Initial';
import Signin from '../screens/Signin';
import SignupStackNavigation from './signup';
import { RootState } from '@base/modules';
import { checkToken } from '@base/modules/signin';

import styled from 'styled-components/native';

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const isSignin = useSelector((state: RootState) => state.signin.isSignin);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('navigation check token');
    dispatch(checkToken());
  }, []);

  console.log('isSignin: ', isSignin);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {isSignin ? (
          <RootStack.Screen name="Main" component={Main} />
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

//naviagtion을 리덕스 사가에서 참조하기 위해 해야하는 사전 작업
const navigationRef = React.createRef<NavigationContainerRef>();

//리덕스 사가 또는 그 외 모든 모듈에서 import 가능
export function navigate(name: string, params: any){
  navigationRef.current?.navigate(name, params);
}

function Main(){
  return (
    <View>
      <Text>Main</Text>
    </View>
  )
}

const View = styled.View``;
const Text = styled.Text``;