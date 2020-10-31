import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import styled from 'styled-components/native';

import PickedAddressItem from './PickedAddressItem';
import { RootState } from '@base/modules';
import { MINT, MINT_STRONG, MINT_RGBA_LINE } from '@base/baseColors';

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
              backgroundColor: MINT_RGBA_LINE,
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
  font-weight: bold;
  color: ${MINT_STRONG};
`;

const PickedList = styled.FlatList`
  height: 100%;
  background: white;
  padding: 0 3%;
  border: 1px solid ${MINT};
`;

export default React.memo(PickedAddressList);
