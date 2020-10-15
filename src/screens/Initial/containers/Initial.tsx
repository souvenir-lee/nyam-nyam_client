import React from 'react';
import { Alert } from 'react-native';
import { InitialProps } from '@base/src/types';
import InitialScreen from '../components/InitialScreen';

export default function Initial({ route, navigation }: InitialProps){
    const handleStoreButtonPress = (): void => {
        navigation.navigate('Signin', {
            signinType: "store",
            title: "사장님 로그인",
        });
    };

    const handleCustomerButtonPress = (): void => {
        Alert.alert(
            "알림",
            "서비스 준비 중 입니다."
        )
    };

    return (
       <InitialScreen 
            handleStoreButtonPress={handleStoreButtonPress}
            handleCustomerButtonPress={handleCustomerButtonPress}
       />
    )
}


