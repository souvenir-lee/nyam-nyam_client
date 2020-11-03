import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import { MINT_RGBA_LINE } from '@base/baseColors';

type DropdownPickerProps = {
  items: any[];
  selectedValue: string;
  onChangeItem: (item: any) => void;
};

export default function ({
  items,
  selectedValue,
  onChangeItem,
}: DropdownPickerProps) {
  console.log('dropdown render:', items);
  if (items && items.length === 0) return null;

  const pickerItems = items.map((item: any) => {
    return (
      <Picker.Item
        label={`(${item.storeAddress}) ${item.storeName}`}
        value={item.id}
      />
    );
  });

  console.log('items: ', items);
  console.log('selcted value in dropdown:', selectedValue);

  return (
    <Picker
      selectedValue={selectedValue}
      style={{
        height: 150,
        width: 250,
        borderColor: `1px sold ${MINT_RGBA_LINE}`,
      }}
      onValueChange={(itemValue) => {
        console.log('selected val: ', itemValue);
        onChangeItem(itemValue);
      }}>
      {pickerItems}
    </Picker>
  );
}

//import React, { FunctionComponent, ReactChild, ReactComponentElement, ReactDOM, ReactElement, ReactHTMLElement, useState } from 'react';
//import styled from 'styled-components/native';
//
//export type DropdownProps = {
//    data: any[];
//    isShow: boolean;
//    Item: FunctionComponent<any>;
//    onItemPress: (args?: any) => void;
//    extra?: any
//};
//
//export default function({ data, isShow, Item, onItemPress, extra }: DropdownProps){
//    const renderItem = ({ item }: any) => {
//        console.log('render item: ', item);
//
//        return (
//        <DropdownItem>
//            <Item
//                data={item}
//                onItemPress={onItemPress}
//                {...extra}
//            />
//        </DropdownItem>
//    )}
//
//    console.log('isShow:', isShow);
//    return (
//        <>
//            {isShow ?
//                <DropdownList
//                    data={data}
//                    renderItem={renderItem}
//                    keyExtractor={(data: any) => data.id}
//                />
//             : null}
//        </>
//    )
//}
//
//
//
//const DropdownList = styled.FlatList`
//    flex:1;
//`;
//
//const DropdownItem = styled.TouchableOpacity``;
