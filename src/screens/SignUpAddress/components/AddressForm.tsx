import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import AddressItem from './AddressItem';
import { getStoreByKeyword } from '@base/api';
import { AddressObject, AddressAPIResult } from '@base/types/api';
import { getAddress } from '@base/modules/signup';
import { RootState } from '@base/modules';

const AddressWrapper = styled.View`
  width: 90%;
  height: 300px;
  align-self: center;
`;

const AddressSearch = styled.TextInput`
  border: 1px solid black;
`;

const AddressList = styled.FlatList`
  height: 100%;
  border: 1px solid black;
`;

type AddressItemProps = {
  item: AddressObject;
};

function AddressForm() {
  const coords = useSelector((state: RootState) => state.signup.coords);
  const { data } = useSelector((state: RootState) => state.signup.address);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    dispatch(getAddress({ keyword: searchInput, coords }));
  };

  return (
    <AddressWrapper>
      <AddressSearch
        placeholder="가게명을 입력해주세요"
        value={searchInput}
        onChangeText={(text: string) => setSearchInput(text)}
        onSubmitEditing={handleSearch}
      />
      <AddressList
        data={data}
        renderItem={({ item }: AddressItemProps) => (
          <AddressItem key={item.id} data={item} />
        )}
      />
    </AddressWrapper>
  );
}

export default React.memo(AddressForm);
