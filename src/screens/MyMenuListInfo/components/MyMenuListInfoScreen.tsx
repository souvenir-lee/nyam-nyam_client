import React, { useState } from 'react';
import styled from 'styled-components/native';

import Dropdown from '@base/components/dropdown';
import MyMenuItem from './MyMenuItem';
import { MyMenuItemType } from '@base/types/mypage';
import { SigninStoreData } from '@base/types/auth';

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

  return (
    <Container>
      <Title>메뉴 목록</Title>

      <DropdownToggle>
        <ToggleText
          onPress={() => setIsDropdownShow(!isDropdownShow) }
        >
          {isDropdownShow ? '▲': '▼'} &nbsp; {currentStore ? currentStore.storeName: ''}
        </ToggleText>
        <Dropdown 
          data={stores}
          isShow={isDropdownShow}
          Item={StoreDropdownItem}
          onItemPress={onStoreSelect}
          extra={{
            onDeletionPress
          }}
        />
      </DropdownToggle>

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

type StoreDropdownItemProps = {
  data: SigninStoreData;
  onItemPress: () => void;
}

function StoreDropdownItem({ data, onItemPress }: StoreDropdownItemProps){
  if(!data) return null;

  return (
    <StoreItem
      onPress={onItemPress}
    >
      <StoreName>
        ({data.storeAddress}) &nbsp;{ data.storeName }
      </StoreName>
    </StoreItem>
  )
}

const Container = styled.View``;

const Title = styled.Text``;

const DropdownToggle = styled.TouchableOpacity``

const StoreItem = styled.View``

const StoreName = styled.Text``;

const ToggleText = styled.Text``;

const MyMenuList = styled.ScrollView``;


