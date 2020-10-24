import React, { useState } from 'react';
import { SignInProps } from '@base/types/Navigation';
import SigninScreen from '../components/SignInScreen';

export default function Signin({ route, navigation }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { title, signInType } = route.params;

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
    navigation.navigate('SignUpNav');
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
