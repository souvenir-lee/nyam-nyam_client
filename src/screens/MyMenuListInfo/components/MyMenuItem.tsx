import React from 'react';
import styled from 'styled-components/native';

import { MyMenuItemType} from '@base/types/mypage';
import { MINT_RGBA_LINE, MINT, MINT_STRONG } from '@base/baseColors';

type MyMenuItemProps = {
    navigation: any;
    menu: MyMenuItemType;
    onMenuItemDetailPress: (id: string | number) => void;
    onDeletionPress: (storeId: string | number, productionId: string | number) => void;
};

const defaultImg = require('@base/../assets/images/default_dessert_image.png');

export default function({ navigation, menu, onMenuItemDetailPress, onDeletionPress }: MyMenuItemProps){
    const { storeId, productionId } = menu;
    const img = menu.production.productionImg || defaultImg;

    return (

        <MyMenuItem>
                <MyMenuImg
                    source={img}
                />
                <MyMenuName
                        onPress={() => {
                        console.log('navigate to ItemModify');
                        navigation.navigate('ItemModify', {
                            productionId
                        });
                    }}
                >
                    {menu.production.productionName}
                </MyMenuName>
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

const MyMenuItem = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid ${MINT_RGBA_LINE};
    background-color: ${MINT_STRONG};
    border-radius: 10px;
    padding:20px;
    margin: 15px 0;
    width:300px;
`;

const MyMenuImg = styled.Image`
    width: 30px;
    height: 30px;
`;


const MyMenuName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  width: 45%;
  margin-right: 5%;
`;

const DeletionButton = styled.TouchableOpacity`
  align-self: center;
  width: 10%;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: red;
`;
