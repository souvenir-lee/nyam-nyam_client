import React, { FunctionComponent, ReactChild, ReactComponentElement, ReactDOM, ReactElement, ReactHTMLElement, useState } from 'react';
import styled from 'styled-components/native';

export type DropdownProps = {
    data: any[];
    isShow: boolean;
    Item: FunctionComponent<any>;
    onItemPress: (args?: any) => void;
    extra?: any
};

export default function({ data, isShow, Item, onItemPress, extra }: DropdownProps){
    const renderItem = ({ item }: any) => (
        <DropdownItem>
            <Item 
                data={item}
                onItemPress={onItemPress}
                {...extra}
            />
        </DropdownItem>
    )

    return (
        <>
            {isShow ? 
                <DropdownList 
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(data: any) => data.id}        
                />
             : null}
        </>
    )
}



const DropdownList = styled.FlatList`
    flex:1;
`;

const DropdownItem = styled.TouchableOpacity``;

