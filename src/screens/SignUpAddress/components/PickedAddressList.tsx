import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import PickedAddressItem from './PickedAddressItem';
import { RootState } from '@base/modules';
import { View } from 'react-native';

type PickedAddressItemProps = {
  item: string;
};

function PickedAddressList() {
  const { data } = useSelector(
    (state: RootState) => state.signup.picked_address
  );

  return (
    <PickedWrapper>
      <PickedListTitle>선택한 가게 목록</PickedListTitle>
      <PickedList
        data={Object.keys(data)}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          />
        )}
        renderItem={({ item }: PickedAddressItemProps) => (
          <PickedAddressItem key={item} data={data[item]} />
        )}
      />
    </PickedWrapper>
  );
}

const PickedWrapper = styled.View`
  flex: 1;
  width: 90%;
  align-self: center;
  margin-bottom: 50px;
`;

const PickedListTitle = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`;

const PickedList = styled.FlatList`
  height: 100%;
  background: white;
  padding: 0 3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export default React.memo(PickedAddressList);
