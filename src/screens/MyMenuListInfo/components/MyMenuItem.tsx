import React from 'react';
import styled from 'styled-components/native';

import { MyMenuItemType } from '@base/types/mypage';

type MyMenuItemProps = {
  data: MyMenuItemType;
  onPress: (id: string | number) => void;
  onDeletionPress: () => void;
};

export default function ({ data, onPress, onDeletionPress }: MyMenuItemProps) {
  return (
    <MyMenuItem>
      <MyMenuBody onPress={(id: string | number) => onPress(id)}>
        <MyMenuImg />
        <MyMenuName>{}</MyMenuName>
      </MyMenuBody>
      <DeletionButton>
        <ButtonText onPress={onDeletionPress}>X</ButtonText>
      </DeletionButton>
    </MyMenuItem>
  );
}

const MyMenuItem = styled.View``;

const MyMenuImg = styled.Image``;

const MyMenuBody = styled.View``;

const MyMenuName = styled.Text``;

const DeletionButton = styled.TouchableOpacity``;

const ButtonText = styled.Text``;
