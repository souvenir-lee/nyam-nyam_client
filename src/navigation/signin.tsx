import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SigninStackParamList } from '../types/index';
import Main from '@base/src/screens/Main';

const SigninStack = createStackNavigator<SigninStackParamList>();

export default function SigninNavigation(){
    return (
        <SigninStack.Navigator>
            <SigninStack.Screen name="Main" component={Main} />
        </SigninStack.Navigator>
    )
}