import React from 'react';
import styled, { css } from '@emotion/native';

import { PickedAddressObject } from '@base/types/SignUpAddress';
import PickedAddressItem from './PickedAddressItem';

const PickedWrapper = styled.View`
  width: 90%;
  height: 300px;
  align-self: center;
`;

const PickedList = styled.FlatList`
  height: 100%;
  border: 1px solid black;
`;

type PickedAddressListProps = {
  address: PickedAddressObject[];
  setAddress: React.Dispatch<React.SetStateAction<PickedAddressObject[]>>;
};

type PickedAddressItemProps = {
  item: PickedAddressObject;
};
function PickedAddressList({ address, setAddress }: PickedAddressListProps) {
  return (
    <PickedWrapper>
      <PickedList
        data={address}
        renderItem={({ item }: PickedAddressItemProps) => (
          <PickedAddressItem
            key={item.id}
            data={item}
            setAddress={setAddress}
          />
        )}
      />
    </PickedWrapper>
  );
}

export default React.memo(PickedAddressList);
