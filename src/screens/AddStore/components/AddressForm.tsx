import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import AddressItem from './AddressItem';
import { AddressObject } from '@base/types/weather';
import { getAddress, clearData } from '@base/modules/addStore';
import { RootState } from '@base/modules';
import { View, Alert } from 'react-native';
import { MINT, MINT_STRONG, MINT_RGBA_LINE } from '@base/baseColors';

type AddressItemProps = {
  item: AddressObject;
};

function AddressForm({ navigation }) {
  const { loading, error, storeAdded, coords } = useSelector(
    (state) => state.addStore
  );
  const { data } = useSelector((state: RootState) => state.addStore.address);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (storeAdded && !loading) {
      dispatch(clearData());
      Alert.alert('가게 추가에 성공했습니다.');
      navigation.goBack();
    } else if (error) {
      Alert.alert('가게를 추가할 수 없습니다.');
      navigation.goBack();
    }
  }, [dispatch, navigation, storeAdded, loading, error]);

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
  height: 80%;
  align-self: center;
  margin-bottom: 100px;
`;

const AddressSearch = styled.TextInput`
  padding: 3%;
  background: white;
  border: 2px solid ${MINT};
  border-radius: 10px;
  font-size: 15px;
  color: ${MINT_STRONG};
`;

const AddressResult = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px;
  color: ${MINT_STRONG};
`;

const AddressList = styled.FlatList`
  height: 100%;
  padding: 0px 3%;
  background: white;
  border: 1px solid ${MINT};
`;

export default React.memo(AddressForm);
