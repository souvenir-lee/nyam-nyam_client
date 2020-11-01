import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignupProps } from '@base/types';
import { InputField, FormKey } from '@base/types/auth';
import SignupScreen from '../components/SignupScreen';
import { RootState } from '@base/modules';
import {
  clearUserdata,
  initializeSignup,
  inputUserFields,
} from '@base/modules/signup';
import useForm from '@base/hooks/useForm';
import { ErrorMsg, ErrorText } from '@base/styles';

export default function Signup({ route, navigation }: SignupProps) {
  const [form, onChange] = useForm({
    email: initialInputField,
    password: initialInputField,
    passwordCheck: initialInputField,
    username: initialInputField,
  });
  const { userFields, isEmailValid, errMsg } = useSelector(
    (state: RootState) => state.signup
  );
  const { email, password, username } = userFields;
  const dispatch = useDispatch();

  const validateForm = () => {
    for (const key in form) {
      if (form[key].errMsg || !form[key].input) {
        return false;
      }
    }
    return true;
  };

  const handleFieldChange = (key: FormKey, input: string) => {
    const errMsg = errMsgByKey[key];
    if (input.length === 0 && form[key].changed) {
      onChange(key, {
        ...form[key],
        input,
        errMsg,
      });
    } else {
      onChange(key, {
        ...form[key],
        input,
        errMsg: null,
        changed: true,
      });
    }
  };

  const handleNextButtonPress = () => {
    if (!validateForm()) {
      Alert.alert('모든 정보를 입력해주세요');
      return;
    }

    dispatch(
      inputUserFields({
        email: form.email.input,
        password: form.password.input,
        username: form.username.input,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeSignup());
    handleFieldChange('email', email);
    handleFieldChange('password', password);
    handleFieldChange('passwordCheck', '');
    handleFieldChange('username', username);
    return () => {
      console.log('cancel rendering');
      dispatch(clearUserdata());
    };
  }, []);

  return (
    <>
      {errMsg ? (
        <ErrorMsg>
          <ErrorText>{errMsg}</ErrorText>
        </ErrorMsg>
      ) : null}

      <SignupScreen
        fields={form}
        handleFieldChange={handleFieldChange}
        handleNextButtonPress={handleNextButtonPress}
      />
    </>
  );
}

const initialInputField: InputField = {
  input: '',
  errMsg: null,
  changed: false,
};

const errMsgByKey = {
  email: '이메일을 입력해주세요',
  password: '비밀번호를 입력해주세요',
  passwordCheck: '비밀번호가 일치하지 않습니다',
  username: '닉네임을 입력해주세요',
};
