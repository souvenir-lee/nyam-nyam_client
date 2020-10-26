import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import { InitialProps } from '@base/types';
import InitialScreen from '../components/InitialScreen';
import { RootState } from '@base/modules';

export default function Initial({ navigation }: InitialProps) {
  const { error, service } = useSelector((state: RootState) => state.signin);

  const handleStoreButtonPress = (): void => {
    navigation.navigate('Signin', {
      title: '사장님 로그인',
      service: 'store',
      initial: true
    });
  };

  const handleCustomerButtonPress = (): void => {
    Alert.alert('알림', '서비스 준비 중 입니다.');
  };

  useEffect(() => {
    //resource api 인증 실패시, 자동으로 로그인 화면으로 이동 + 에러 메시지 보여주기
    console.log('initial rendered');
    const navigateToSignin = () => {
      if(service && error){  //이전에 리소스 api 요청시 인증 실패했다면
        navigation.navigate('Signin', {
          title: service === 'store' ? '사장님 로그인' : '고객 로그인',
          service,
          initial: false
        });
      }
    };

    navigateToSignin();
  }, [])

  return (
    <InitialScreen
      handleStoreButtonPress={handleStoreButtonPress}
      handleCustomerButtonPress={handleCustomerButtonPress}
    />
  );
}