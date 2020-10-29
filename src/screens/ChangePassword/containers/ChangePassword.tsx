import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChangePasswordScreen from '../components/ChangePasswordScreen';
import { ChangePasswordProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';
import {requestPasswordChange} from '@base/modules/mypage';

export default function ChangePasswordContainer({
  navigation,
}: ChangePasswordProps) {
  const [currentPasswordField, setCurrentPasswordField] = useState<InputField>(initialInputField);
  const [passwordField, setPasswordField] = useState<InputField>(initialInputField);
  const [passwordConfirmField, setPasswordConfirmField] = useState<InputField>(initialInputField);
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.mypage.error);

  const handleCurrentPasswordChange = (input: string) => {
    let field: InputField = {
      input,
      errorMsg: null
    };

    if(error && error.changePassword) field.errorMsg = error.changePassword;

    setCurrentPasswordField(field);
  };
  const handlePasswordChange = (input: string) => {
    let field: InputField = {
      input,
      errorMsg: null
    };
    
    
    if(field.input.length === 0) field.errorMsg = '변경할 비밀번호를 입력해주세요.'
    
    setPasswordField(field);

  };
  const handlePasswordConfirmChange = (input: string) => {
    let field: InputField = {
      input,
      errorMsg: null
    };
    
    
    if(passwordField.input !== field.input){
      field.errorMsg = '비밀번호가 일치하지 않습니다.';
    }
    setPasswordConfirmField(field);

  };
  const handleSubmit = () => {
    if(currentPasswordField.errorMsg || passwordField.errorMsg || passwordConfirmField.errorMsg){
      return;
    }

    dispatch(requestPasswordChange(currentPasswordField.input, passwordField.input));    
  };
  
  return <ChangePasswordScreen 
    navigation={navigation}
    currentPasswordField={currentPasswordField}
    passwordField={passwordField} 
    passwordConfirmField={passwordConfirmField}
    onCurrentPasswordChange={handleCurrentPasswordChange}
    onPasswordChange={handlePasswordChange}
    onPasswordConfirmChange={handlePasswordConfirmChange}
    onSubmit={handleSubmit}
  />;
}

type InputField = {
  input: string;
  errorMsg: string | null;
};

const initialInputField = {
  input: '',
  errorMsg: null
};