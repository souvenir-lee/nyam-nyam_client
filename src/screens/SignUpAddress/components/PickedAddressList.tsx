import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import PickedAddressItem from './PickedAddressItem';
import { RootState } from '@base/modules';

const PickedWrapper = styled.View`
  width: 90%;
  height: 300px;
  align-self: center;
`;

const PickedList = styled.FlatList`
  height: 100%;
  border: 1px solid black;
`;

type PickedAddressItemProps = {
  item: string;
};

function PickedAddressList() {
  const { data } = useSelector(
    (state: RootState) => state.signup.picked_address
  );

  return (
    <PickedWrapper>
      <PickedList
        data={Object.keys(data)}
        renderItem={({ item }: PickedAddressItemProps) => (
          <PickedAddressItem key={item} data={data[item]} />
        )}
      />
    </PickedWrapper>
  );
}

export default React.memo(PickedAddressList);
