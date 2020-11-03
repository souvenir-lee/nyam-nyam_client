import React from 'react';
import styled from 'styled-components/native';

import { MINT, MINT_RGBA_LINE, MINT_STRONG } from '@base/baseColors';

type onDeletionHandler = (id: number | string) => void;

type MyStoreItem = {
  id: number;
  storeName: string;
  storeAddress: string;
  latitude: number;
  longitude: number;
  onStoreItemDeletionPress: onDeletionHandler;
};

export default function MyStoreListInfoScreen({
  onStoreItemDeletionPress,
  id,
  storeName,
  storeAddress,
  latitude,
  longitude,
}): MyStoreItem {
  console.log('func:', onStoreItemDeletionPress);
  return (
    <StoreItem>
      <StoreName>{storeName}</StoreName>
      <StoreAddress>주소: {storeAddress}</StoreAddress>
      <DeletionButton onPress={() => onStoreItemDeletionPress(id)}>
        <Text>X</Text>
      </DeletionButton>
    </StoreItem>
  );
}

const StoreItem = styled.View`
  width: 100%;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${MINT_STRONG};
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const StoreName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  width: 45%;
  margin-right: 5%;
`;

const StoreAddress = styled.Text`
  align-self: center;
  color: white;
  width: 40%;
  margin-right: 5%;
`;

const DeletionButton = styled.TouchableOpacity`
  align-self: center;
  width: 10%;
`;

const Text = styled.Text`
  font-size: 20px;
  color: red;
`;
