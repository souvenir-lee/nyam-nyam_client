import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import SignInForm from './SigninForm';
import { MINT, MINT_STRONG } from '@base/baseColors';

type SignInScreenProps = {
  title: string;
  email: string;
  password: string;
  loading: boolean;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleSignupPress: (text: string) => void;
  handleSigninPress: () => void;
  handleSocialSigninPress: () => void;
};

const width = Dimensions.get('window').width;

export default function SigninScreen({
  title,
  email,
  password,
  loading,
  handleEmailChange,
  handlePasswordChange,
  handleSignupPress,
  handleSigninPress,
  handleSocialSigninPress,
}: SignInScreenProps) {
  return (
    <SigninContainer behavior="padding">
      <TitleImage
        source={require('@base/../assets/images/logo.png')}
        resizeMode="contain"
      />
      <Title>{title}</Title>
      <SignInForm
        email={email}
        password={password}
        loading={loading}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSignupPress={handleSignupPress}
        handleSigninPress={handleSigninPress}
      />
      {/* <SocialSigninWrapper>
        <SocialSigninButton
          title="카카로 로그인"
          onPress={handleSocialSigninPress}
          color="#FFC87C"
        />
      </SocialSigninWrapper> */}
    </SigninContainer>
  );
}

const SigninContainer = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

const TitleImage = styled.Image`
  width: ${width * 0.8}px;
  height: ${width * 0.3}px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: 'BMHANNA';
  color: ${MINT_STRONG};
  font-weight: bold;
  margin: 10% 0;
  font-weight: bold;
`;

const SocialSigninWrapper = styled.View`
  margin-top: 50px;
`;

const SocialSigninButton = styled.Button`
  color: black;
  background-color: yellow;
`;

const Text = styled.Text`
  color: black;
`;
