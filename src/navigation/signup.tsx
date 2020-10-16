import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupParamList } from '../types';
import Signup from '../screens/Signup';
//import StoreRegister from '../screens/StoreRegister';

const SignupStack = createStackNavigator<SignupParamList>();

import { View, Text } from 'react-native';
function StoreRegister(){
    return (
        <View>
            <Text>
                Store Register
            </Text>
        </View>
    )
}

export default function SignupStackNavigation(){
    return (
        <SignupStack.Navigator>
            <SignupStack.Screen name="Signup" component={Signup} />
            <SignupStack.Screen name="StoreRegister" component={StoreRegister} />
        </SignupStack.Navigator>
    )
}