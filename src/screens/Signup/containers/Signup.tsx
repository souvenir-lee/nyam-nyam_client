import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpProps } from '@base/types/Navigation/SignUpNavigation';
import { InputField } from '@base/types/auth';
import SignupScreen from '../components/SignupScreen';
import { RootState } from '@base/modules';
import { verifyEmail } from '@base/modules/signup';

import { ErrorMsg, ErrorText } from '@base/styles';

export default function Signup({ route, navigation }: SignUpProps) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
  });
  const { email, username, password, passwordCheck } = form;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.signup.userFields
  );
  const dispatch = useDispatch();

  const handleFormChange = (field: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleNextButtonPress = () => {
    if (!email) {
      Alert.alert('유효한 이메일을 입력해주세요.');
      setForm((prevForm) => ({ ...prevForm, email: '' }));
    } else if (!username) {
      Alert.alert('닉네임을 입력해주세요.');
    } else if (!password) {
      Alert.alert('비밀번호를 입력해주세요.');
    } else if (!passwordCheck) {
      Alert.alert('비밀번호 확인을 입력해주세요.');
    } else if (password !== passwordCheck) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
    } else {
      dispatch(
        verifyEmail({
          email,
          username,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (!loading) {
      if (data) {
        navigation.navigate('SignUpAddress');
      } else {
        Alert.alert('중복된 이메일입니다.');
      }
    }
  }, [data, loading, error, navigation]);

  return (
    <SignupScreen
      form={form}
      handleFormChange={handleFormChange}
      handleNextButtonPress={handleNextButtonPress}
    />
  );
}
