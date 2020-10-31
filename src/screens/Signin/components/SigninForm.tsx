import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { MINT, MINT_STRONG, MINT_STRONG_RGBA_LINE } from '@base/baseColors';

type SigninFormProps = {
  email: string;
  password: string;
  loading: boolean;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleSignupPress: (text: string) => void;
  handleSigninPress: () => void;
};

export default function SignInForm({
  email,
  password,
  loading,
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
          placeholderTextColor={MINT_STRONG}
          onChangeText={handleEmailChange}
          value={email}
        />
        <SigninInput
          secureTextEntry={true}
          placeholder={'비밀번호'}
          placeholderTextColor={MINT_STRONG}
          onChangeText={handlePasswordChange}
          value={password}
        />
        <Button
          title="로그인"
          onPress={handleSigninPress}
          loading={loading}
          buttonStyle={{
            backgroundColor: MINT_STRONG,
          }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </LocalSigninForm>

      <SignupView>
        <Text>아직 회원이 아니신가요?</Text>
        <SignupRedirectLink onPress={handleSignupPress}>
          <Text style={{ color: MINT_STRONG, fontWeight: 'bold' }}>
            회원가입
          </Text>
        </SignupRedirectLink>
      </SignupView>

      <View />
    </SigninFormContainer>
  );
}

const SigninFormContainer = styled.View`
  width: 100%;
`;

const LocalSigninForm = styled.View`
  margin: 3% 0;
`;

const SigninInput = styled.TextInput`
  padding: 3%;
  background: white;
  margin-bottom: 5%;
  border: 2px solid ${MINT};
  border-radius: 10px;
  color: ${MINT};
`;

const SignupView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5%;
`;

const SignupRedirectLink = styled.TouchableOpacity`
  margin-left: 10px;
`;
