import React, { useState } from 'react';
import { SignUpProps } from '@base/types/Navigation/SignUpNavigation';
import SignUpScreen from '../components/SignUpScreen';

export default function SignUp({ route, navigation }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handlePasswordCheckChange = (text: string) => {
    setPasswordCheck(text);
  };
  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handleNextButtonPress = () => {
    navigation.navigate('SignUpAddress');
  };

  return (
    <SignUpScreen
      email={email}
      password={password}
      passwordCheck={passwordCheck}
      username={username}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handlePasswordCheckChange={handlePasswordCheckChange}
      handleUsernameChange={handleUsernameChange}
      handleNextButtonPress={handleNextButtonPress}
    />
  );
}
