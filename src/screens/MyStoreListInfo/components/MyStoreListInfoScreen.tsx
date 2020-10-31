import React from 'react';
import styled from 'styled-components/native';

import { MyStoreListInfoProps } from '@base/types/Navigation/MyPageNavigation';
import { SigninStoreData } from '@base/types/auth';
import StoreItem from './MyStoreItem';

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

      <ButtonWrapper>
        <StoreAddButton onPress={onAddStoreNavigatePress}>
          <Text>＋</Text>
        </StoreAddButton>
      </ButtonWrapper>

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
    </Container>
  );
}

const Container = styled.View`
  margin: 0 10%;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  margin: 10% 0;
`;

const MyStoreList = styled.ScrollView`
  margin: 10% 0;
`;

const ButtonWrapper = styled.View`
  margin-left: auto;
`;
const StoreAddButton = styled.TouchableOpacity``;

const Text = styled.Text`
  color: blue;
  font-size: 40px;
  font-weight: bold;
`;
