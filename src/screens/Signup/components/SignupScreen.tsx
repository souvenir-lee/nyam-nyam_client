import React from 'react';
import styled from 'styled-components/native';
import { InputField } from '@base/types/auth';

type SignupScreenProps = {
  emailField: InputField;
  passwordField: InputField;
  passwordCheckField: InputField;
  usernameField: InputField;
  handleEmailFieldChange: (text: string) => void;
  handlePasswordFieldChange: (text: string) => void;
  handlePasswordCheckFieldChange: (text: string) => void;
  handleUsernameFieldChange: (text: string) => void;
  handleNextButtonPress: (text: string) => void;
};

export default function SigninScreen({
  emailField,
  passwordField,
  passwordCheckField,
  usernameField,
  handleEmailFieldChange,
  handlePasswordFieldChange,
  handlePasswordCheckFieldChange,
  handleUsernameFieldChange,
  handleNextButtonPress,
}: SignupScreenProps) {

  return (
    <SignupContainer>
      <Title>사장님 회원가입</Title>

      <SignupForm>
        <SignupField>
          <SignupInput
            placeholder={'이메일'}
            onChangeText={handleEmailFieldChange}
            value={emailField.input}
          />
          {emailField.errMsg ? <ErrMsg>{emailField.errMsg}</ErrMsg> : null}
        </SignupField>

        <SignupField>
          <SignupInput
            secureTextEntry={true}
            placeholder={'비밀번호'}
            onChangeText={handlePasswordFieldChange}
            value={passwordField.input}
          />
          {passwordField.errMsg ? <ErrMsg>{passwordField.errMsg}</ErrMsg> : null}
        </SignupField>

        <SignupField>
          <SignupInput
            secureTextEntry={true}
            placeholder={'비밀번호 확인'}
            onChangeText={handlePasswordCheckFieldChange}
            value={passwordCheckField.input}
          />
          {passwordCheckField.errMsg ? <ErrMsg>{passwordCheckField.errMsg}</ErrMsg> : null}
        </SignupField>

        <SignupField>
          <SignupInput
            placeholder={'이름'}
            onChangeText={handleUsernameFieldChange}
            value={usernameField.input}
          />
          {usernameField.errMsg ? <ErrMsg>{usernameField.errMsg}</ErrMsg> : null}
        </SignupField>
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

const SignupField = styled.View`
  padding: 8px 5px;
`;

const SignupInput = styled.TextInput`
  padding: 3%;
  background: white;
  margin-bottom: 3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ErrMsg = styled.Text`
  color:red;
`

const NextButton = styled.Button``;
