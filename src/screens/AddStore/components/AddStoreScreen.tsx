import React, { useState } from 'react';
import styled from 'styled-components/native';

import AddressForm from './AddressForm';
import { AddStoreProps } from '@base/types/Navigation/MyPageNavigation';
import { MINT_STRONG } from '@base/baseColors';

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
  color: ${MINT_STRONG};
  font-weight: bold;
`;
