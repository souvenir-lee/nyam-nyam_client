import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';

import { deleteMyMenuItem } from '@base/modules/mypage';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';
import { PredictDataObject } from '@base/types/predict';

type AddressItemProps = {
  navigation: SalesPredictProps['navigation'];
  data: PredictDataObject;
  rank: number;
  isLast: boolean;
};

function SalesPredictItem({
  navigation,
  data,
  rank,
  isLast,
  storeId,
}: AddressItemProps) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleItemPress = () => {
    navigation.navigate('ItemDetailNav', {
      screen: 'ItemDetail',
      params: { productionId: data.id },
    });
  };

  const openMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleModifyClick = () => {
    setVisible(false);
    navigation.navigate('ItemDetailNav', {
      screen: 'ItemModify',
      params: { storeId, productionId: data.id },
    });
  };

  const handleRemoveClick = () => {
    dispatch(deleteMyMenuItem(storeId, data.id));
  };
  return (
    <SalesPredictOpacity isLast={isLast} onPress={handleItemPress}>
      <ItemRank>{rank}위</ItemRank>
      <ItemRow>
        <ItemName>{data.productionName}</ItemName>
        <ItemPredict>{`예상 판매량: ${data.quantity}`}</ItemPredict>
      </ItemRow>
      <ItemRow style={{ flexDirection: 'row' }}>
        <ItemImage
          source={
            data.productionImg
              ? { uri: data.productionImg }
              : require('@base/../assets/images/default_dessert_image.png')
          }
        />
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={
            <MenuIconWrapper onPress={openMenu}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </MenuIconWrapper>
          }>
          <Menu.Item onPress={handleModifyClick} title="수정" />
          <Menu.Item onPress={handleRemoveClick} title="삭제" />
        </Menu>
      </ItemRow>
    </SalesPredictOpacity>
  );
}

const SalesPredictOpacity = styled.TouchableOpacity`
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  width: 300px;
  padding: 7px 0px;
  padding-bottom: 10px;
  border-bottom-width: ${(props) => (props.isLast ? '0px' : '2px')};
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const ItemRank = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

const ItemRow = styled.View`
  justify-content: center;
`;
const ItemName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const ItemPredict = styled.Text`
  font-size: 17px;
`;
const ItemImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;
const MenuIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export default React.memo(SalesPredictItem);
