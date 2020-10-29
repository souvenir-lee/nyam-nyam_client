import React, { useState } from 'react';
import styled from 'styled-components/native';

import { ChangePasswordProps } from '@base/types/Navigation/MyPageNavigation';
import { Alert } from 'react-native';
import { MINT, MINT_RGBA_LINE } from '@base/baseColors';
import { ErrorMsg, ErrorText } from '@base/styles';

type InputField = {
  input: string;
  errorMsg: string | null;
};

type ChangePasswordScreenProps = {
  navigation: ChangePasswordProps['navigation'];
  currentPasswordField: InputField;
  passwordField: InputField;
  passwordConfirmField: InputField;
  onCurrentPasswordChange: (input: string) => void;
  onPasswordChange: (input: string) => void;
  onPasswordConfirmChange: (input: string) => void;
  onSubmit: () => void;
};

export default function ChangePasswordScreen({
  navigation, currentPasswordField, passwordField, passwordConfirmField,
  onCurrentPasswordChange, onPasswordChange, onPasswordConfirmChange,
  onSubmit
}: ChangePasswordScreenProps) {
  return (
    <Container>
      <Title>비밀번호 변경</Title>

      <PasswordChangeForm>
        <Field>
          <TextInput 
            secureTextEntry={true}
            textContentType="password"
            placeholder="현재 비밀번호"
            onChangeText={onCurrentPasswordChange}
          />
          {
            currentPasswordField.errorMsg 
          ? (<ErrorMsg><ErrorText>{currentPasswordField.errorMsg}</ErrorText></ErrorMsg>) 
            : null
          }
        </Field>        

        <Field>
          <TextInput 
            secureTextEntry={true}
            textContentType="password"
            placeholder="변경할 비밀번호"
            onChangeText={onPasswordChange}
          />
          {
            passwordField.errorMsg 
          ? (<ErrorMsg><ErrorText>{passwordField.errorMsg}</ErrorText></ErrorMsg>) 
            : null
          }
        </Field>

        <Field>
          <TextInput 
            secureTextEntry={true}
            textContentType="password"
            placeholder="비밀번호 확인"
            onChangeText={onPasswordConfirmChange}
          />
          {
            passwordConfirmField.errorMsg 
          ? (<ErrorMsg><ErrorText>{passwordConfirmField.errorMsg}</ErrorText></ErrorMsg>) 
            : null
          }
        </Field>

        <ButtonWrapper>
          <SubmitButton 
            title="비밀번호 변경"
            outline
            color={MINT}
            onPress={onSubmit}
          />
        </ButtonWrapper>
      </PasswordChangeForm>
    </Container>
  )
}

const Container = styled.View``;

const Title = styled.Text`
  text-align:center;
  font-size:30px;
  font-weight:bold;
  padding-top:40px;
`;

const PasswordChangeForm = styled.View`
  padding:17%;
`;

const Field = styled.View`

`

const TextInput = styled.TextInput`
  background-color:white;
  border-radius:10px;
  margin: 10px 0;
  padding:20px;
  height: 60px;
  border: 1px solid ${MINT_RGBA_LINE};
`;


const ButtonWrapper = styled.View`
  margin-top:30px;
`

const SubmitButton = styled.Button`
`;
