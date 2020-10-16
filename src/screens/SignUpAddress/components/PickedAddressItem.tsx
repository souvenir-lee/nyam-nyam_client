import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { PickedAddressObject } from '@base/types/SignUpAddress';
import { removeAddress } from '@base/modules/signup';

const PickedItemWrapper = styled.View``;
const PickedItemName = styled.Text``;
const PickedItemLocation = styled.Text``;
const PickedItemRemove = styled.TouchableOpacity``;

type PickedAddressListProps = {
  data: PickedAddressObject;
};

function PickedAddressItem({ data }: PickedAddressListProps) {
  const dispatch = useDispatch();

  const handleItemRemove = () => {
    dispatch(removeAddress(data.id));
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
