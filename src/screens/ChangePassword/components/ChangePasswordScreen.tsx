import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { ChangePasswordProps } from '@base/types/Navigation/MyPageNavigation';
import { MINT, MINT_RGBA_LINE, MINT_STRONG } from '@base/baseColors';
import { ErrorMsg, ErrorText } from '@base/styles';

type InputField = {
  input: string;
  errorMsg: string | null;
};

type ChangePasswordScreenProps = {
  navigation: ChangePasswordProps['navigation'];
  loading: boolean;
  currentPasswordField: InputField;
  passwordField: InputField;
  passwordConfirmField: InputField;
  onCurrentPasswordChange: (input: string) => void;
  onPasswordChange: (input: string) => void;
  onPasswordConfirmChange: (input: string) => void;
  onSubmit: () => void;
};

export default function ChangePasswordScreen({
  navigation,
  loading,
  currentPasswordField,
  passwordField,
  passwordConfirmField,
  onCurrentPasswordChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}: ChangePasswordScreenProps) {
  return (
    <Container behavior="padding">
      <Title>비밀번호 변경</Title>

      <PasswordChangeForm>
        <Field>
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="현재 비밀번호"
            placeholderTextColor={MINT_STRONG}
            onChangeText={onCurrentPasswordChange}
          />
          {currentPasswordField.errorMsg ? (
            <ErrorMsg>
              <ErrorText>{currentPasswordField.errorMsg}</ErrorText>
            </ErrorMsg>
          ) : null}
        </Field>

        <Field>
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="변경할 비밀번호"
            placeholderTextColor={MINT_STRONG}
            onChangeText={onPasswordChange}
          />
          {passwordField.errorMsg ? (
            <ErrorMsg>
              <ErrorText>{passwordField.errorMsg}</ErrorText>
            </ErrorMsg>
          ) : null}
        </Field>

        <Field>
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="비밀번호 확인"
            placeholderTextColor={MINT_STRONG}
            onChangeText={onPasswordConfirmChange}
          />
          {passwordConfirmField.errorMsg ? (
            <ErrorMsg>
              <ErrorText>{passwordConfirmField.errorMsg}</ErrorText>
            </ErrorMsg>
          ) : null}
        </Field>

        <ButtonWrapper>
          <Button
            title="비밀번호 변경"
            type="solid"
            loading={loading}
            buttonStyle={{
              backgroundColor: MINT_STRONG,
            }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={onSubmit}
          />
        </ButtonWrapper>
      </PasswordChangeForm>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView``;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: 'BMHANNA';
  color: ${MINT_STRONG};
  font-weight: bold;
  padding-top: 40px;
`;

const PasswordChangeForm = styled.View`
  padding: 17%;
`;

const Field = styled.View``;

const TextInput = styled.TextInput`
  border-radius: 10px;
  margin: 10px 0;
  padding: 3%;
  border: 2px solid ${MINT};
  color: ${MINT_STRONG};
`;

const ButtonWrapper = styled.View`
  margin-top: 30px;
`;

const SubmitButton = styled.Button``;
