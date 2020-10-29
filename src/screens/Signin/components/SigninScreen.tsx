import React from 'react';
import styled from 'styled-components/native';
import SignInForm from './SigninForm';

type SignInScreenProps = {
  title: string;
  email: string;
  password: string;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleSignupPress: (text: string) => void;
  handleSigninPress: (text: string) => void;
  handleSocialSigninPress: () => void;
};

export default function SigninScreen({
  title,
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSignupPress,
  handleSigninPress,
  handleSocialSigninPress
}: SignInScreenProps) {
  return (
    <SigninContainer>
      <Title>{title}</Title>

      <SignInForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSignupPress={handleSignupPress}
        handleSigninPress={handleSigninPress}
      />

      <SocialSigninWrapper>
        <SocialSigninButton 
          title='카카로 로그인'
          onPress={handleSocialSigninPress}
          color="#FFC87C"
        >
        </SocialSigninButton>
      </SocialSigninWrapper>
    </SigninContainer>
  );
}

const SigninContainer = styled.View`
  display: flex;
  justify-content: center;
  padding: 0 15%;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  margin: 10% 0;
  font-weight: bold;
`;

const SocialSigninWrapper = styled.View`
  margin-top:50px;
`

const SocialSigninButton = styled.Button`
  color: black;
  background-color: yellow
`

const Text = styled.Text`
  color:black;
`
