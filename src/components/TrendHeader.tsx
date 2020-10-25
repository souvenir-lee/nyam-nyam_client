import React from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { MINT, MINT_RGBA_LINE } from '@base/baseColors';

type TrendHeaderProps = {
  navigation: StackNavigationProp<Record<string, unknown | undefined>, string>;
};

const TrendHeader = ({ navigation }: TrendHeaderProps) => {
  return (
    <TrendHeaderContainer>
      <TrendHeaderIconWrapper
        onPress={() => navigation.navigate('SalesPredict')}>
        <TrendHeaderIcon source={require('../../assets/images/logo.png')} />
      </TrendHeaderIconWrapper>
      <TrendHeaderTitle>최근 트렌드</TrendHeaderTitle>
      <TrendHeaderSearchBtn onPress={() => navigation.navigate('SearchNav')}>
        <MaterialIcons name="search" size={30} color={MINT} />
      </TrendHeaderSearchBtn>
    </TrendHeaderContainer>
  );
};

const TrendHeaderContainer = styled.View`
  width: 100%;
  height: 70px;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 2;
  border-bottom-color: ${MINT_RGBA_LINE};
  background-color: white;
`;

const TrendHeaderIconWrapper = styled.TouchableOpacity``;

const TrendHeaderIcon = styled.Image`
  width: 75px;
  height: 45px;
  margin-left: 5px;
`;

const TrendHeaderTitle = styled.Text`
  flex: 1;
  color: ${MINT};
  font-size: 22px;
  font-family: 'BMHANNA';
  text-align: center;
`;

const TrendHeaderSearchBtn = styled.TouchableOpacity`
  width: 75px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

export default TrendHeader;
