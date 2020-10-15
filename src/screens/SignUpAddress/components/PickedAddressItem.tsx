import React from 'react';
import { Text } from 'react-native';
import styled, { css } from '@emotion/native';

import { PickedAddressObject } from '@base/types/SignUpAddress';

const PickedItemWrapper = styled.View``;
const PickedItemName = styled.Text``;
const PickedItemLocation = styled.Text``;
const PickedItemRemove = styled.TouchableOpacity``;

type PickedAddressListProps = {
  data: PickedAddressObject;
  setAddress: React.Dispatch<React.SetStateAction<PickedAddressObject[]>>;
};

function PickedAddressItem({ data, setAddress }: PickedAddressListProps) {
  const handleItemRemove = () => {
    setAddress((address) => address.filter((item) => item.id !== data.id));
  };

  return (
    <PickedItemWrapper>
      <PickedItemName>{data.place_name}</PickedItemName>
      <PickedItemLocation>{data.address_name}</PickedItemLocation>
      <PickedItemRemove onPress={handleItemRemove}>
        <Text>X</Text>
      </PickedItemRemove>
    </PickedItemWrapper>
  );
}

export default React.memo(PickedAddressItem);
