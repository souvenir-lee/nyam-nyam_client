import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { MyMenuItemType } from '@base/types/mypage';
import { MINT_RGBA_LINE, MINT, MINT_STRONG } from '@base/baseColors';

type MyMenuItemProps = {
  navigation: any;
  menu: MyMenuItemType;
  onMenuItemDetailPress: (id: string | number) => void;
  onDeletionPress: (
    storeId: string | number,
    productionId: string | number
  ) => void;
};

const width = Dimensions.get('window').width;
const defaultImg = require('@base/../assets/images/default_dessert_image.png');

export default function ({
  navigation,
  menu,
  onMenuItemDetailPress,
  onDeletionPress,
}: MyMenuItemProps) {
  const { storeId, productionId } = menu;
  const img = menu.production.productionImg
    ? { uri: menu.production.productionImg }
    : defaultImg;

  return (
    <MyMenuItem>
      <MyMenuImg source={img} />
      <MyMenuName
        onPress={() => {
          navigation.navigate('ItemModify', {
            productionId,
            storeId,
          });
        }}>
        {menu.production.productionName}
      </MyMenuName>
      <DeletionButton>
        <ButtonText onPress={() => onDeletionPress(storeId, productionId)}>
          X
        </ButtonText>
      </DeletionButton>
    </MyMenuItem>
  );
}

const MyMenuItem = styled.View`
  width: 100%;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${MINT_STRONG};
  padding: 10px 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const MyMenuImg = styled.Image`
  width: ${width * 0.1};
  height: ${width * 0.1};
  margin-right: 5%;
`;

const MyMenuName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  width: 70%;
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
