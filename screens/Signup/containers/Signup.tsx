import React, { useState } from 'react';
import { SignupProps } from '@base/types';
import SignupScreen from '../components/SignupScreen';

export default function Signup({ route, navigation }: SignupProps){
    const [email, setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [passwordCheck ,setPasswordCheck] = useState('');
    const [username, setUsername] = useState('');
    
    const handleEmailChange = (text: string)  => {
        setEmail(text);
    };
    const handlePasswordChange = (text: string) =>{
        setPassword(text);
    };
    const handlePasswordCheckChange = (text: string) =>{
        setPasswordCheck(text);
    };
    const handleUsernameChange = (text: string) =>{
        setUsername(text);
    };
    
    const handleNextButtonPress = () => {
        navigation.navigate('StoreRegister');
    };

    return (
       <SignupScreen 
            email={email}
            password={password}
            passwordCheck={passwordCheck}
            username={username}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handlePasswordCheckChange={handlePasswordCheckChange}
            handleUsernameChange={handleUsernameChange}
            handleNextButtonPress={handleNextButtonPress}
       />
    )
}


