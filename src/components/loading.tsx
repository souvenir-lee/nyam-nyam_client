import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export default function Loading() {
  console.log('load loading component');
  return (
    <LoadingContainer>
      <LoadingImg size="large" />
      <Text>로딩 중...</Text>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.View``;
const LoadingImg = styled.ActivityIndicator``;
const Text = styled.Text`
  text-align: center;
`;
