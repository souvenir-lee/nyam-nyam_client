import React from 'react';
import styled from 'styled-components/native'

import { MyMenuItemType} from '@base/types/mypage';

type MyMenuItemProps = {
    menu: MyMenuItemType;
    onMenuItemDetailPress: (id: string | number) => void;
    onDeletionPress: (storeId: string | number, productionId: string | number) => void;
};

export default function({ menu, onMenuItemDetailPress, onDeletionPress }: MyMenuItemProps){
    const { storeId, productionId } = menu;

    return (

        <MyMenuItem>
            <MyMenuBody
                onPress={onMenuItemDetailPress}
            >
                <MyMenuImg 
                    
                />
                <MyMenuName>
                    {menu.production.productionName}
                </MyMenuName>
            </MyMenuBody>
            <DeletionButton>
                <ButtonText
                    onPress={() => onDeletionPress(storeId, productionId)}
                >
                    X
                </ButtonText>
            </DeletionButton>
        </MyMenuItem>
    )
}

const MyMenuItem = styled.View``;

const MyMenuImg = styled.Image``;

const MyMenuBody = styled.View``;

const MyMenuName = styled.Text``;

const DeletionButton = styled.TouchableOpacity``;

const ButtonText = styled.Text``;