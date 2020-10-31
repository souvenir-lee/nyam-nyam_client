import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { View } from 'react-native';

import AddressItem from './AddressItem';
import { AddressObject } from '@base/types/weather';
import { getAddress } from '@base/modules/signup';
import { RootState } from '@base/modules';
import { MINT, MINT_STRONG, MINT_RGBA_LINE } from '@base/baseColors';

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
        placeholderTextColor={MINT_STRONG}
        value={searchInput}
        onChangeText={(text: string) => setSearchInput(text)}
        onSubmitEditing={handleSearch}
      />
      <AddressResult>{`검색 결과: ${data ? data.length : 0}개`}</AddressResult>
      <AddressList
        data={data}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: MINT_RGBA_LINE,
            }}
          />
        )}
        renderItem={({ item }: AddressItemProps) => (
          <AddressItem key={item.id} data={item} />
        )}
      />
    </AddressWrapper>
  );
}

const AddressWrapper = styled.View`
  width: 90%;
  height: 300px;
  align-self: center;
  margin-bottom: 10px;
`;

const AddressSearch = styled.TextInput`
  padding: 3%;
  background: white;
  border: 2px solid ${MINT};
  color: ${MINT_STRONG};
  border-radius: 10px;
  font-size: 15px;
`;

const AddressResult = styled.Text`
  font-size: 15px;
  margin: 10px 0px;
  font-weight: bold;
  color: ${MINT_STRONG};
`;

const AddressList = styled.FlatList`
  height: 100%;
  padding: 0px 3%;
  background: white;
  border: 1px solid ${MINT};
`;

export default React.memo(AddressForm);
