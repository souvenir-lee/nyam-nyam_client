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
  onDeletionPress: () => void;
};

export default function MyMenuListInfoScreen({
  menus, stores, currentStore, onStoreSelect, onDeletionPress
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
          Item={MyMenuItem}
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

              />
            )
          }) 
          : null
        }
      </MyMenuList>
    </Container>
  )
}

const Container = styled.View``;

const Title = styled.Text``;

const DropdownToggle = styled.TouchableOpacity``

const ToggleText = styled.Text``;

const MyMenuList = styled.ScrollView``;


