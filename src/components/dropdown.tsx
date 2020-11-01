import React from 'react';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';


type DropdownPickerProps = {
    items: any[];
    defaultValue: string;
    onChangeItem: (item: any) => void
}

export default function({ items, defaultValue, onChangeItem }: DropdownPickerProps){
    console.log('dropdown render:', items);
    if(items && items.length === 0) return null;

    items = items.map((item: any) => (
        <Picker.Item 
            label={`${item.storeAddress} ${item.storeName}`} 
            value={item.id}
        />
    ));

    console.log('items: ', items);
    console.log(defaultValue);
    
    return (
    <Picker
        selectedValue={defaultValue}
        style={{height: 150, width: 200}}
        onValueChange={(itemValue) => {
            console.log('selected val: ', itemValue)
            onChangeItem(itemValue)
        }}
    >
        {items}
      </Picker>
    )
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

