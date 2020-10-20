import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

type SigninFormProps = {
  email: string;
  password: string;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleSignupPress: (text: string) => void;
  handleSigninPress: (text: string) => void;
};

export default function SigninForm({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSignupPress,
  handleSigninPress,
}: SigninFormProps) {
  return (
    <SigninFormContainer>
      <LocalSigninForm>
        <SigninInput
          placeholder={'이메일'}
          onChangeText={handleEmailChange}
          value={email}
        />
        <SigninInput
          secureTextEntry={true}
          placeholder={'비밀번호'}
          onChangeText={handlePasswordChange}
          value={password}
        />

        <SigninButton title="로그인" onPress={handleSigninPress} />
      </LocalSigninForm>

      <SignupView>
        <Text>아직 회원이 아니신가요?</Text>
        <SignupRedirectLink onPress={handleSignupPress}>
          <Text style={{ color: 'blue' }}>회원가입</Text>
        </SignupRedirectLink>
      </SignupView>

      <View />
    </SigninFormContainer>
  );
}

const SigninFormContainer = styled.View``;

const LocalSigninForm = styled.View`
  margin: 3% 0;
`;

const SigninInput = styled.TextInput`
  padding: 3%;
  background: white;
  margin-bottom: 3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const SigninButton = styled.Button``;

const SignupView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5%;
`;

const SignupRedirectLink = styled.TouchableOpacity`
  margin-left: 10px;
`;
