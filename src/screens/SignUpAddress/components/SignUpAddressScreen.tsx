import React from 'react';
import styled from 'styled-components/native';

import AddressForm from './AddressForm';
import PickedAddressList from './PickedAddressList';
import { MINT, MINT_STRONG } from '@base/baseColors';

type SignUpAddressProps = {
  handleRegisterButtonPress: () => void;
};

export default function SignUpAddress({
  handleRegisterButtonPress,
}: SignUpAddressProps) {
  return (
    <Container behavior="padding">
      <TextContainer>
        <HeaderText>
          사장님의 가게를 최소 1개 이상 등록해주세요.{'\n'}나중에 추가로 등록할
          수도 있습니다.
        </HeaderText>
      </TextContainer>
      <AddressForm />
      <PickedAddressList />
      <RegisterButton onPress={handleRegisterButtonPress}>
        <RegisterText>회원가입</RegisterText>
      </RegisterButton>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const TextContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const HeaderText = styled.Text`
  text-align: center;
  line-height: 30px;
  font-size: 17px;
  font-weight: bold;
  color: ${MINT};
`;

const RegisterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  justify-content: center;
  background-color: ${MINT_STRONG};
`;

const RegisterText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;
