import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import Dropdown from '@base/components/dropdown';
import MyMenuItem from './MyMenuItem';
import { MyMenuItemType } from '@base/types/mypage';
import { SigninStoreData } from '@base/types/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { MINT_RGBA_TEXT } from '@base/baseColors';

type MyMenuListInfoProps = {
  stores: SigninStoreData[] | [];
  currentStore: SigninStoreData | null;
  menus: MyMenuItemType[] | []; 
  onStoreSelect: (id: string | number) => void;
  onMenuItemDetailPress: () => void; 
  onDeletionPress: (storeId: string | number, productionId: string | number) => void;
};

export default function MyMenuListInfoScreen({
  menus, stores, currentStore, onStoreSelect, onMenuItemDetailPress, onDeletionPress
}: MyMenuListInfoProps) {
  const [isDropdownShow, setIsDropdownShow] = useState<boolean>(false);
  console.log('stores in menu item screen: ', stores);


  return (
    <Container>
      <Title>메뉴 목록</Title>

      <DropdownWrapper>
        <Dropdown 
          items={stores}
          defaultValue={stores.length > 0 ? stores[0].storeName : ''}
          onChangeItem={onStoreSelect}
        />
      </DropdownWrapper>

      <MyMenuList>
        {
          menus.length > 0 
          ? menus.map((menu: MyMenuItemType) => {
              return (
                <MyMenuItem 
                  menu={menu}
                  onMenuItemDetailPress={onMenuItemDetailPress}
                  onDeletionPress={onDeletionPress}
                />
              )
          }) 
          : null
        }
      </MyMenuList>
    </Container>
  )
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




