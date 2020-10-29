import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export default function Loading() {
  console.log('load loading component');
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.View`
  flex:1;
  justify-content: center;
`;
const LoadingImg = styled.ActivityIndicator``;
const Text = styled.Text`
  text-align: center;
`;
