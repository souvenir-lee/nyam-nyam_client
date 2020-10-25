import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignInProps } from '@base/types/Navigation';
import SigninScreen from '../components/SigninScreen';
import { requestSignin } from '@base/modules/signin';
import { RootState } from '@base/modules';
import { ErrorMsg, ErrorText } from '@base/styles';
import Loading from '@base/components/loading';

export default function Signin({ route, navigation }: SignInProps) {
  const { title } = route.params;
  const { error, loading } = useSelector((state: RootState) => state.signin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const state = useSelector((state: RootState) => state);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSigninPress = () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('아이디 또는 비밀번호를 입력해주세요.');
      return;
    }

    const signinInfo = {
      email,
      password,
    };

    dispatch(requestSignin(signinInfo));
  };
  const handleSignupPress = () => {
    navigation.navigate('SignUpNav');
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SigninScreen
            title={title}
            email={email}
            password={password}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSignupPress={handleSignupPress}
            handleSigninPress={handleSigninPress}
          />
        </>
      )}
    </>
  );
}
