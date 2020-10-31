import React from 'react';
import styled from 'styled-components/native';

import { MINT_RGBA_LINE } from '@base/baseColors'

type onDeletionHandler = (id: number|string) => void;

type MyStoreItem = {
    id: number;
    storeName: string;
    storeAddress: string;
    latitude: number;
    longitude: number;
    onStoreItemDeletionPress: onDeletionHandler;
};

export default function MyStoreListInfoScreen({ onStoreItemDeletionPress, 
    id, storeName, storeAddress, latitude, longitude }): MyStoreItem 
{
  console.log('func:', onStoreItemDeletionPress)
  return (
    <StoreItem>
        <StoreName>
            {storeName}
        </StoreName>
        <StoreAddress>
           주소: {storeAddress}
        </StoreAddress>
        <DeletionButton
            onPress={() => (onStoreItemDeletionPress(id))}
        >
            <Text>X</Text>
        </DeletionButton>
    </StoreItem>
  )
}

const StoreItem = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid ${MINT_RGBA_LINE};
    border-radius: 10px;
    background-color: white;
    padding:10px 20px;

`;

const StoreName = styled.Text`
    font-size:20px;
    font-weight:bold;
`;

const StoreAddress = styled.Text`
    align-self: center;
`;

const DeletionButton = styled.TouchableOpacity`
    align-self: center;
`;

const Text = styled.Text`
    font-size:20px;
`;