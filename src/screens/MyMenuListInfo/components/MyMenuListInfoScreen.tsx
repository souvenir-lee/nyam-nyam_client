import React from 'react';
import styled from 'styled-components/native';

import Dropdown from '@base/components/dropdown';
import MyMenuItem, { MyMenuItemType } from './MyMenuItem';

type MyMenuListInfoProps = {
  menus: MyMenuItemType[] | null;
};

export default function MyMenuListInfoScreen({ menus }: MyMenuListInfoProps) {
  return (
    <Container>
      <Title>메뉴 목록</Title>

      <DropdownToggle>
        <ToggleText />
        <Dropdown />
      </DropdownToggle>

      <MyMenuList>
        {menus?.map((menu) => {
          <MyMenuItem key={menu.id} menu={menu} />;
        })}
      </MyMenuList>
    </Container>
  );
}

const Container = styled.View``;

const Title = styled.Text``;

const DropdownToggle = styled.TouchableOpacity``;

const ToggleText = styled.Text``;

const MyMenuList = styled.ScrollView``;
