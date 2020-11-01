import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { PickedAddressObject } from '@base/types/SignUpAddress';
import { removeAddress } from '@base/modules/signup';
import { MINT, MINT_STRONG } from '@base/baseColors';

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
      <PickedColumn>
        <PickedItemName>{data.place_name}</PickedItemName>
        <PickedItemLocation>{data.address_name}</PickedItemLocation>
      </PickedColumn>
      <PickedColumn>
        <PickedItemRemove onPress={handleItemRemove}>
          <RemoveText>X</RemoveText>
        </PickedItemRemove>
      </PickedColumn>
    </PickedItemWrapper>
  );
}

const PickedItemWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const PickedColumn = styled.View`
  justify-content: center;
  padding: 7px 0px;
`;
const PickedItemName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${MINT_STRONG};
`;
const PickedItemLocation = styled.Text`
  color: ${MINT_STRONG};
`;
const PickedItemRemove = styled.TouchableOpacity`
  margin-right: 10px;
`;
const RemoveText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;
export default React.memo(PickedAddressItem);
