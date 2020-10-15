import React, { useState } from 'react';
import { Text } from 'react-native';
import styled, { css } from '@emotion/native';

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

type SignUpAddressProps = {
  coords: Coords;
};

export default function SignUpAddress({ coords }: SignUpAddressProps) {
  // 추후 redux로 전체적인 상태관리를 할 것.
  const [address, setAddress] = useState<PickedAddressObject[]>([]);
  return (
    <Container>
      <TextContainer>
        <HeaderText>
          사장님의 가게를 최소 1개 이상 등록해주세요.{'\n'}나중에 추가로 등록할
          수도 있습니다.
        </HeaderText>
      </TextContainer>
      <AddressForm coords={coords} setAddress={setAddress} />
      <PickedAddressList address={address} setAddress={setAddress} />
      <RegisterButton>
        <Text>회원가입</Text>
      </RegisterButton>
    </Container>
  );
}
