import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SigninProps } from '@base/types';
import SigninScreen from '../components/SigninScreen';
import { setSigninType, requestSignin } from '@base/modules/signin';
import { RootState } from '@base/modules';
import { Alert } from 'react-native';

export default function Signin({ route, navigation }: SigninProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { title, signinType } = route.params;
  const { isSignin, user, error } = useSelector((state: RootState) => state.signin);
  const dispatch = useDispatch();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSigninPress = () => {
    if(email.length === 0 || password.length === 0){
      Alert.alert('이메일 또는 패스워드를 입력하세요.')
      return;
    }    

    const signinInfo = {
      email,
      password
    };
    
    dispatch(requestSignin(signinInfo));

  };
  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  if(isSignin) navigation.navigate('Main');
  

  return (
    <>
      {!isSignin && error &&
        <ErrorMsg>
          <ErrorText>{error}</ErrorText>  
        </ErrorMsg>
      }

      <SigninScreen
        title={title}
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSignupPress={handleSignupPress}
      />
    </>
  );
}

const ErrorMsg = styled.View`
`;

const ErrorText = styled.Text`
  color: red;
`;