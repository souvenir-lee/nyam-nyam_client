import React from 'react';
import styled from 'styled-components/native';
import { InputField, FormKey } from '@base/types/auth';
import { MINT, MINT_STRONG } from '@base/baseColors';

type SignupScreenProps = {
  fields: {
    email: InputField;
    password: InputField;
    passwordCheck: InputField;
    username: InputField;
  };
  handleFieldChange: (key: FormKey, input: string) => void;
  handleNextButtonPress: () => void;
};

export default function SigninScreen({
  fields,
  handleFieldChange,
  handleNextButtonPress,
}: SignupScreenProps) {
  const { email, password, passwordCheck, username } = fields;
  return (
    <SignupContainer behavior="padding">
      <Title>회원가입</Title>
      <SignupForm>
        <SignupField>
          <SignupInput
            placeholder={'이메일'}
            placeholderTextColor={MINT_STRONG}
            onChangeText={(text: string) => handleFieldChange('email', text)}
            value={email.input}
          />
          {email.errMsg ? <ErrMsg>{email.errMsg}</ErrMsg> : null}
        </SignupField>

        <SignupField>
          <SignupInput
            secureTextEntry={true}
            placeholder={'비밀번호'}
            placeholderTextColor={MINT_STRONG}
            onChangeText={(text: string) => handleFieldChange('password', text)}
            value={password.input}
          />
          {password.errMsg ? <ErrMsg>{password.errMsg}</ErrMsg> : null}
        </SignupField>

        <SignupField>
          <SignupInput
            secureTextEntry={true}
            placeholder={'비밀번호 확인'}
            placeholderTextColor={MINT_STRONG}
            onChangeText={(text: string) =>
              handleFieldChange('passwordCheck', text)
            }
            value={passwordCheck.input}
          />
          {passwordCheck.errMsg ? (
            <ErrMsg>{passwordCheck.errMsg}</ErrMsg>
          ) : null}
        </SignupField>

        <SignupField>
          <SignupInput
            placeholder={'이름'}
            placeholderTextColor={MINT_STRONG}
            onChangeText={(text: string) => handleFieldChange('username', text)}
            value={username.input}
          />
          {username.errMsg ? <ErrMsg>{username.errMsg}</ErrMsg> : null}
        </SignupField>
      </SignupForm>

      <NextButton onPress={handleNextButtonPress}>
        <NextText>다음</NextText>
      </NextButton>
    </SignupContainer>
  );
}

const SignupContainer = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  /* padding: 0 15%; */
`;

const Title = styled.Text`
  text-align: center;
  font-size: 25px;
  font-family: 'BMHANNA';
  font-weight: bold;
  color: ${MINT_STRONG};
`;

const SignupForm = styled.View`
  margin: 10% 0;
`;

const SignupField = styled.View`
  padding: 0 15%;
`;

const SignupInput = styled.TextInput`
  position: relative;
  padding: 3%;
  background: white;
  margin-bottom: 10%;
  border: 2px solid ${MINT};
  border-radius: 10px;
  color: ${MINT_STRONG};
`;

const ErrMsg = styled.Text`
  color: red;
  position: absolute;
  bottom: 6%;
  left: 22%;
`;

const NextButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  justify-content: center;
  background-color: ${MINT_STRONG};
`;

const NextText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;
