import React from 'react';
import styled from 'styled-components/native';
import SigninRedirectButton from './SigninRedirectButton';

type InitialScreenProps = {
  handleStoreButtonPress: () => void;
  handleCustomerButtonPress: () => void;
};

export default function InitialScreen({
  handleStoreButtonPress,
  handleCustomerButtonPress,
}: InitialScreenProps) {
  return (
    <InitialContainer>
      <LogoImage
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Message>{'본인이 누구인지 선택해주세요.'}</Message>

      <ButtonWrapper>
        <SigninRedirectButton
          title="저는 고객입니다."
          handlePress={handleCustomerButtonPress}
        />
        <SigninRedirectButton
          title="저는 사장입니다."
          handlePress={handleStoreButtonPress}
        />
      </ButtonWrapper>
    </InitialContainer>
  );
}

const InitialContainer = styled.View`
  padding: 0 15%;
`;

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 10% auto;
`;

const Message = styled.Text`
  text-align: center;
  font-size: 16px;
  margin: 5% 0;
`;

const ButtonWrapper = styled.View`
  display: flex;
  justify-content: space-evenly;
  height: 40%;
`;