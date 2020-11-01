import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { MyStoreListInfoProps } from '@base/types/Navigation/MyPageNavigation';
import { SigninStoreData } from '@base/types/auth';
import StoreItem from './MyStoreItem';
import { MINT_STRONG } from '@base/baseColors';

type MyStoreListInfoScreen = {
  navigation: MyStoreListInfoProps['navigation'];
  store: any;
  onStoreItemDeletionPress: (id: number | string) => void;
  onAddStoreNavigatePress: () => void;
};

export default function MyStoreListInfoScreen({
  navigation,
  store,
  onStoreItemDeletionPress,
  onAddStoreNavigatePress,
}: MyStoreListInfoScreen) {
  const storeList = [];
  for (const id in store) {
    storeList.push(store[id]);
  }
  console.log('func: ', onStoreItemDeletionPress);
  return (
    <Container>
      <Title>내 가게 편집</Title>

      <MyStoreList>
        {storeList.map((storeItem) => {
          return (
            <StoreItem
              key={storeItem.id}
              onStoreItemDeletionPress={onStoreItemDeletionPress}
              {...storeItem}
            />
          );
        })}
      </MyStoreList>
      <StoreAddButton onPress={onAddStoreNavigatePress}>
        <Text>＋</Text>
      </StoreAddButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 5%;
  /* align-items: center; */
  justify-content: center;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: 'BMHANNA';
  color: ${MINT_STRONG};
  margin-bottom: 10%;
`;

const MyStoreList = styled.ScrollView``;

const StoreAddButton = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 50px;
`;

const Text = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: ${MINT_STRONG};
  border-radius: 30px;
`;
