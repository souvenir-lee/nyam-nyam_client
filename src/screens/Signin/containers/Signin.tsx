import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SigninProps } from '@base/types';
import SigninScreen from '../components/SigninScreen';

export default function Signin({ route, navigation }: SigninProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { title, signinType } = route.params;

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSigninPress = () => {
    //로그인 성공
    //navigation.navigate('SalePredict');
    //로그인 실패
    //...
  };
  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <SigninScreen
      title={title}
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSignupPress={handleSignupPress}
    />
  );
}
