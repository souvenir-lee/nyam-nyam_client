import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import AddressForm from './AddressForm';
import PickedAddressList from './PickedAddressList';
import { PickedAddressObject, Coords } from '@base/types/SignUpAddress';

const Container = styled.View`
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
  font-size: 15px;
`;

const RegisterButton = styled.TouchableOpacity``;

export default function SignUpAddress() {
  return (
    <Container>
      <TextContainer>
        <HeaderText>
          사장님의 가게를 최소 1개 이상 등록해주세요.{'\n'}나중에 추가로 등록할
          수도 있습니다.
        </HeaderText>
      </TextContainer>
      <AddressForm />
      <PickedAddressList />
      <RegisterButton>
        <Text>회원가입</Text>
      </RegisterButton>
    </Container>
  );
}
