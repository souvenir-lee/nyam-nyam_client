import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import AddressItem from './AddressItem';
import { AddressObject } from '@base/types/weather';
import { getAddress, clearData } from '@base/modules/addStore';
import { RootState } from '@base/modules';
import { View, Alert } from 'react-native';

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
      Alert.alert("가게 추가에 성공했습니다.");
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
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 15px;
`;

const AddressResult = styled.Text`
  font-size: 15px;
  margin: 10px 0px;
`;

const AddressList = styled.FlatList`
  height: 100%;
  padding: 0px 3%;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export default React.memo(AddressForm);
