import React, { useState } from 'react';
import styled from 'styled-components/native';

import Dropdown from '@base/components/dropdown';
import MyMenuItem from './MyMenuItem';
import { MyMenuItemType } from '@base/types/mypage';
import { SigninStoreData } from '@base/types/auth';
import { MINT_RGBA_TEXT, MINT_STRONG } from '@base/baseColors';
import AddMenu from '@base/screens/AddMenu';

type MyMenuListInfoProps = {
  navigation: any;
  stores: SigninStoreData[] | [];
  currentStore: SigninStoreData | null;
  menus: MyMenuItemType[] | [];
  onStoreSelect: (id: string | number) => void;
  onMenuItemDetailPress: () => void;
  onAddMenuPress: () => void;
  onDeletionPress: (
    storeId: string | number,
    productionId: string | number
  ) => void;
};

export default function MyMenuListInfoScreen({
  navigation,
  menus,
  stores,
  currentStore,
  onStoreSelect,
  onMenuItemDetailPress,
  onAddMenuPress,
  onDeletionPress,
}: MyMenuListInfoProps) {
  console.log('stores in menu item screen: ', stores);

  return (
    <Container>
      <Title>메뉴 목록</Title>

      <DropdownWrapper>
        <Dropdown
          items={stores}
          selectedValue={currentStore.id}
          onChangeItem={onStoreSelect}
        />
      </DropdownWrapper>

      <MyMenuList>
        {menus.length > 0
          ? menus.map((menu: MyMenuItemType) => {
              return (
                <MyMenuItem
                  menu={menu}
                  //onMenuItemDetailPress={onMenuItemDetailPress}
                  navigation={navigation}
                  onDeletionPress={onDeletionPress}
                />
              );
            })
          : null}
      </MyMenuList>

      <AddMenuButton
        onPress={() => {
          navigation.navigate('AddMenu', {
            storeId: currentStore.id,
          });
        }}>
        <Text>＋</Text>
      </AddMenuButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 5%;
  justify-content: center;
`;

const DropdownWrapper = styled.View`
  margin: 0 auto;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: 'BMHANNA';
  color: ${MINT_STRONG};
  margin-bottom: 10%;
`;

const MyMenuList = styled.ScrollView``;

const AddMenuButton = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 50px;
`;

const Text = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: ${MINT_STRONG};
  border-radius: 30px;
`;
