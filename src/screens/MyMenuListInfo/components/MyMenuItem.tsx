import React from 'react';
import styled from 'styled-components/native'

export type MyMenuItemType = {
    id: number | string;
    storeId: number | string;
    productionId: number | string;
    productionName: string;
    productionImg: string;
    quantity: number | string
};

type MyMenuItemProps = {
    menu: MyMenuItemType;
    onDeletionPress: () => void;
};

export default function({ menu, onDeletionPress }: MyMenuItemProps){
    return (
        <MyMenuItem>
            <MyMenuImg 
            
            />
            <MyMenuRight>
                <MyMenuName>
                    {menu.productionName}
                </MyMenuName>
                <DeletionButton>
                    <ButtonText
                        onPress={onDeletionPress}
                    >
                        X
                    </ButtonText>
                </DeletionButton>
            </MyMenuRight>
        </MyMenuItem>
    )
}

const MyMenuItem = styled.View``;

const MyMenuImg = styled.Image``;

const MyMenuRight = styled.View``;

const MyMenuName = styled.Text``;

const DeletionButton = styled.TouchableOpacity``;

const ButtonText = styled.Text``;