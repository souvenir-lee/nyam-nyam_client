import React from 'react';
import styled from 'styled-components/native';
import { TrendSignatureProps } from '@base/types/Navigation/TrendSignatureNavigation';

type TrendSignatureScreenProps = {
  navigation: TrendSignatureProps['navigation'];
};

export default function TrendSignatureScreen({
  navigation,
}: TrendSignatureScreenProps) {
  return (
    <TrendContainer>
      <TrendSelectorContainer>
        <TrendSelector>
          <TrendSelectorText>디저트 종류</TrendSelectorText>
        </TrendSelector>
        <TrendSelector last>
          <TrendSelectorText>주재료</TrendSelectorText>
        </TrendSelector>
      </TrendSelectorContainer>
    </TrendContainer>
  );
}

const TrendContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const TrendSelectorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  padding: 0 40px;
`;

const TrendSelector = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const TrendSelectorText = styled.Text`
  font-size: 18px;
`;
