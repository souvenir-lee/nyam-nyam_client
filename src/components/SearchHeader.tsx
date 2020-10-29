import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

import useInput from '@base/hooks/useInput';
import { MINT_STRONG_RGBA_LINE } from '@base/baseColors';

const SearchHeader = () => {
  const [value, onValueChange, resetValue] = useInput('');
  const [category, onCategoryChange, resetCategory] = useInput('name');

  useEffect(() => {
    return () => {
      resetValue();
      resetCategory();
    };
  }, []);

  const handleSearch = () => {
    console.log(value);
  };

  return (
    <SearchHeaderForm>
      <DropDown
        items={[{ label: '이름', value: 'name' }]}
        defaultValue={'name'}
        containerStyle={{ height: 40 }}
        labelStyle={{ textAlign: 'center', fontSize: 15 }}
        dropDownStyle={{ width: 70, marginLeft: 20 }}
        onChangeItem={onCategoryChange}
      />
      <SearchHeaderSearch
        placeholder="검색하기"
        value={value}
        onChangeText={onValueChange}
        onSubmitEditing={handleSearch}
      />
    </SearchHeaderForm>
  );
};

const SearchHeaderForm = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const SearchHeaderSearch = styled.TextInput`
  flex: 1;
  padding: 3%;
  height: 40px;
  background: white;
  border: 1.5px solid ${MINT_STRONG_RGBA_LINE};
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
  font-size: 15px;
`;

const DropDown = styled(DropDownPicker)`
  width: 70;
  margin-left: 20;
  border-top-left-radius: 5;
  border-top-right-radius: 0;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 0;
  border-width: 2;
  border-color: ${MINT_STRONG_RGBA_LINE};
`;

export default SearchHeader;
