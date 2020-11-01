import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ChangePasswordScreen from '../components/ChangePasswordScreen';
import { ChangePasswordProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';
import { requestPasswordChange } from '@base/modules/mypage';

export default function ChangePasswordContainer({
  navigation,
}: ChangePasswordProps) {
  const [currentPasswordField, setCurrentPasswordField] = useState<InputField>(
    initialInputField
  );
  const [passwordField, setPasswordField] = useState<InputField>(
    initialInputField
  );
  const [passwordConfirmField, setPasswordConfirmField] = useState<InputField>(
    initialInputField
  );
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.mypage);

  const handleCurrentPasswordChange = (input: string) => {
    const field: InputField = {
      input,
      errorMsg: null,
    };

    if (error && error.changePassword) field.errorMsg = error.changePassword;

    setCurrentPasswordField(field);
  };
  const handlePasswordChange = (input: string) => {
    const field: InputField = {
      input,
      errorMsg: null,
    };

    if (field.input.length === 0)
      field.errorMsg = '변경할 비밀번호를 입력해주세요.';

    setPasswordField(field);
  };
  const handlePasswordConfirmChange = (input: string) => {
    const field: InputField = {
      input,
      errorMsg: null,
    };

    if (passwordField.input !== field.input) {
      field.errorMsg = '비밀번호가 일치하지 않습니다.';
    }
    setPasswordConfirmField(field);
  };
  const handleSubmit = () => {
    if (
      currentPasswordField.errorMsg ||
      passwordField.errorMsg ||
      passwordConfirmField.errorMsg
    ) {
      Alert.alert('올바른 정보를 입력해주세요.');
      return;
    } else if (
      !currentPasswordField.input ||
      !passwordField.input ||
      !passwordConfirmField.input
    ) {
      Alert.alert('모든 정보를 입력해주세요.');
      return;
    }

    dispatch(
      requestPasswordChange(currentPasswordField.input, passwordField.input)
    );
    navigation.goBack();
  };

  return (
    <ChangePasswordScreen
      navigation={navigation}
      loading={loading}
      currentPasswordField={currentPasswordField}
      passwordField={passwordField}
      passwordConfirmField={passwordConfirmField}
      onCurrentPasswordChange={handleCurrentPasswordChange}
      onPasswordChange={handlePasswordChange}
      onPasswordConfirmChange={handlePasswordConfirmChange}
      onSubmit={handleSubmit}
    />
  );
}

type InputField = {
  input: string;
  errorMsg: string | null;
};

const initialInputField = {
  input: '',
  errorMsg: null,
};
