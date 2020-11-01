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
  onDeletionPress: (storeId: string | number, productionId: string | number) => void;
};

export default function MyMenuListInfoScreen({
  navigation, menus, stores, currentStore, onStoreSelect, onMenuItemDetailPress, onAddMenuPress, onDeletionPress
}: MyMenuListInfoProps) {
  console.log('stores in menu item screen: ', stores);


  return (
    <Container>
      <Title>메뉴 목록</Title>

      <DropdownWrapper>
        <Dropdown 
          items={stores}
          selectedValue={`${currentStore?.storeAddress} ${currentStore?.storeName}`}
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
              )
          }) 
          : null
        }
      </MyMenuList>

      <AddMenuButton
        onPress={() => {
          navigation.navigate('AddMenu');
         }} 
      >
        <Text>＋</Text>
      </AddMenuButton>
    </Container>
  );
}

const Container = styled.ScrollView`
`;

const DropdownWrapper = styled.View`
  margin:0 auto;
`;

const Title = styled.Text`
  font-size:30px;
  text-align: center;
  font-weight:bold;
  margin-top: 11%;
  color: ${MINT_RGBA_TEXT};
`;

const MyMenuList = styled.ScrollView`
  margin: 0 auto;
`;

const AddMenuButton = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 50px;
  margin-top:50px;
`;

const Text = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: ${MINT_STRONG};
  border-radius: 30px;
`;

