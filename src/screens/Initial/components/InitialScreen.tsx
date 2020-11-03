import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import SigninRedirectButton from './SigninRedirectButton';
import { MINT_STRONG_RGBA_TEXT } from '@base/baseColors';
const logo = require('@base/../assets/images/logo.png');

type InitialScreenProps = {
  handleStoreButtonPress: () => void;
  handleCustomerButtonPress: () => void;
};

export default function InitialScreen({
  handleStoreButtonPress,
  handleCustomerButtonPress,
}: InitialScreenProps) {
  
  useEffect(() => {
    setTimeout(() => {
      handleStoreButtonPress();
    }, 0);
  });

  return (
    <InitialContainer>
      <LogoImage
        source={logo}
      />

      <Message>
        안녕하세요. 
        저희는 날씨를 기반으로 디저트의 수요를 예측해주는&nbsp;
        <Bold>냠냠</Bold>입니다.
      </Message>
    </InitialContainer>
  );
}

const InitialContainer = styled.View`
  padding: 0 15%;
  margin:auto;
`;

const LogoImage = styled.Image`
  width: 200px;
  height: 150px;
  margin: 10% auto;
`;

const Message = styled.Text`
  text-align: center;
  font-size: 16px;
  margin: 5% 0;
`;

const Bold = styled.Text`
  color:${MINT_STRONG_RGBA_TEXT};
  font-size:20px;
  font-weight: bold;
`;


const ButtonWrapper = styled.View`
  display: flex;
  justify-content: space-evenly;
  height: 40%;
`;