import React, { FunctionComponent, ReactChild, ReactComponentElement, ReactDOM, ReactElement, ReactHTMLElement, useState } from 'react';
import styled from 'styled-components/native';

type DropdownProps = {
    data: any[];
    isShow: boolean;
    Item: FunctionComponent<any>
    onPress: () => void;
}

export default function({ data, isShow, Item, onPress }: DropdownProps){
    const renderItem = () => (
        <DropdownItem
            onPress={onPress}
        >
            <Item />
        </DropdownItem>
    )

    return (
        <>
            {isShow ? 
                <DropdownList 
                    data={data}
                    renderItem={DropdownItem}
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

