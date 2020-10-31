import React, { useState } from 'react';
import styled from 'styled-components/native';

import AddressForm from './AddressForm';
import { AddStoreProps } from '@base/types/Navigation/MyPageNavigation';

type AddStoreScreenProps = {
  navigation: AddStoreProps['navigation'];
};

export default function AddStoreScreen({ navigation }: AddStoreScreenProps) {
  return (
    <Container>
      <TextContainer>
        <HeaderText>추가할 가게의 이름을 검색해주세요.</HeaderText>
      </TextContainer>
      <AddressForm navigation={navigation} />
    </Container>
  );
}

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

const RegisterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  justify-content: center;
  background-color: 'rgba(52, 152, 219,1.0)';
`;

const RegisterText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
