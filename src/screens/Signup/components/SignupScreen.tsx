import React, { useState } from 'react';
import styled from 'styled-components/native';

type SignupScreenProps = {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handlePasswordCheckChange: (text: string) => void;
  handleUsernameChange: (text: string) => void;
  handleNextButtonPress: (text: string) => void;
};

export default function SigninScreen({
  email,
  password,
  passwordCheck,
  username,
  handleEmailChange,
  handlePasswordChange,
  handlePasswordCheckChange,
  handleUsernameChange,
  handleNextButtonPress,
}: SignupScreenProps) {
  return (
    <SignupContainer>
      <Title>사장님 회원가입</Title>

      <SignupForm>
        <SignupInput
          placeholder={'이메일'}
          onChangeText={handleEmailChange}
          value={email}
        />
        <SignupInput
          placeholder={'비밀번호'}
          onChangeText={handlePasswordChange}
          value={password}
        />

        <SignupInput
          placeholder={'비밀번호 확인'}
          onChangeText={handlePasswordCheckChange}
          value={passwordCheck}
        />

        <SignupInput
          placeholder={'이름'}
          onChangeText={handleUsernameChange}
          value={username}
        />
      </SignupForm>

      <NextButton title="다음" onPress={handleNextButtonPress} />
    </SignupContainer>
  );
}

const SignupContainer = styled.View`
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

const SignupForm = styled.View`
  margin: 10% 0;
`;

const SignupInput = styled.TextInput`
  padding: 3%;
  background: white;
  margin-bottom: 3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const NextButton = styled.Button``;
