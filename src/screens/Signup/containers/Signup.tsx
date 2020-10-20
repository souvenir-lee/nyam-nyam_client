import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SignupProps } from '@base/types';
import { InputField } from '@base/types/auth';
import SignupScreen from '../components/SignupScreen';
import { Alert } from 'react-native';
import { inputUserInfo } from '@base/modules/signup';

export default function Signup({ route, navigation }: SignupProps) {
  const [emailField, setEmailField] = useState<InputField>(initialInputField);
  const [passwordField, setPasswordField] = useState<InputField>(initialInputField);
  const [passwordCheckField, setPasswordCheckField] = useState<InputField>(initialInputField);
  const [usernameField, setUsernameField] = useState<InputField>(initialInputField);
  const dispatch = useDispatch();

  const handleEmailFieldChange = (input: string) => {
    let field:InputField = {
      input,
      errMsg: null
    };

    if(input.length === 0) field.errMsg = '이메일을 입력해주세요.' 

    setEmailField(field);
  };
  const handlePasswordFieldChange = (input: string) => {
    let field:InputField = {
      input,
      errMsg: null
    };

    if(input.length === 0) field.errMsg = '비밀번호를 입력해주세요.' 

    setPasswordField(field);
  };
  const handlePasswordCheckFieldChange = (input: string) => {
    let field:InputField = {
      input,
      errMsg: null
    };

    if(input.length === 0 || passwordField.input !== input){
      field.errMsg = '비밀번호가 일치하지 않습니다.' 
    }

    setPasswordCheckField(field);
  };
  const handleUsernameFieldChange = (input: string) => {
    let field:InputField = {
      input,
      errMsg: null
    };

    if(input.length === 0) field.errMsg = '이름을 입력해주세요.' 
    
    setUsernameField(field);
  };
  const handleNextButtonPress = () => {
    if(emailField.errMsg || passwordField.errMsg || passwordCheckField.errMsg 
      || usernameField.errMsg){
        return Alert.alert('회원정보가 올바르지 않습니다.');
      }

    dispatch(inputUserInfo({
      email: emailField.input,
      password: passwordField.input,
      username: usernameField.input
    }));
    
    navigation.navigate('SignUpAddress');
  };

  useEffect(function initialize(){
    handleEmailFieldChange('');
    handlePasswordFieldChange('');
    handlePasswordCheckFieldChange('');
    handleUsernameFieldChange('');
  }, [])

  return (
    <SignupScreen
      emailField={emailField}
      passwordField={passwordField}
      passwordCheckField={passwordCheckField}
      usernameField={usernameField}
      handleEmailFieldChange={handleEmailFieldChange}
      handlePasswordFieldChange={handlePasswordFieldChange}
      handlePasswordCheckFieldChange={handlePasswordCheckFieldChange}
      handleUsernameFieldChange={handleUsernameFieldChange}
      handleNextButtonPress={handleNextButtonPress}
    />
  );
}


const initialInputField: InputField = {
  input: '',
  errMsg: null
};
