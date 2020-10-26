import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignupProps } from '@base/types';
import { InputField } from '@base/types/auth';
import SignupScreen from '../components/SignupScreen';
import { RootState } from '@base/modules';
import { initializeSignup, inputUserFields } from '@base/modules/signup';

import { ErrorMsg, ErrorText } from '@base/styles';

export default function Signup({ route, navigation }: SignupProps) {
  const [emailField, setEmailField] = useState<InputField>(initialInputField);
  const [passwordField, setPasswordField] = useState<InputField>(initialInputField);
  const [passwordCheckField, setPasswordCheckField] = useState<InputField>(initialInputField);
  const [usernameField, setUsernameField] = useState<InputField>(initialInputField);
  const { userFields, isEmailValid, errMsg } = useSelector((state: RootState) => state.signup);
  const { email, password, username } = userFields;
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
        return 
      }

    dispatch(inputUserFields({
      email: emailField.input,
      password: passwordField.input,
      username: usernameField.input
    }));
    
  };

  useEffect(function initializeFields(){
    dispatch(initializeSignup());
    handleEmailFieldChange(email);
    handlePasswordFieldChange(password);
    handlePasswordCheckFieldChange('');
    handleUsernameFieldChange(username);
  }, []);
  
  useEffect(() => {
    console.log('email is ', isEmailValid);
  }, [isEmailValid])
  
  console.log('render');
  return (
    <>
      {
        errMsg ? 
          <ErrorMsg>
            <ErrorText>{errMsg}</ErrorText>
          </ErrorMsg>
         : null
      }

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
    </>
  );
}


const initialInputField: InputField = {
  input: '',
  errMsg: null
};