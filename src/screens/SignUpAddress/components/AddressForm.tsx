import React, { useState } from 'react';
import { Alert, Platform, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';

import AddressItem from './AddressItem';
import { getStoreByKeyword } from '@base/api';
import { AddressObject, AddressAPIResult } from '@base/types/api';
import { PickedAddressObject, Coords } from '@base/types/SignUpAddress';

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

type AddressFormProps = {
  coords: Coords;
  setAddress: React.Dispatch<React.SetStateAction<PickedAddressObject[]>>;
};

type AddressItemProps = {
  item: AddressObject;
};

function AddressForm({ coords, setAddress }: AddressFormProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<AddressAPIResult>([]);

  const handleSearch = async () => {
    const results = await getStoreByKeyword(searchInput, coords);
    setSearchResult(results);
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
        data={searchResult}
        renderItem={({ item }: AddressItemProps) => (
          <AddressItem key={item.id} data={item} setAddress={setAddress} />
        )}
      />
    </AddressWrapper>
  );
}

export default React.memo(AddressForm);
