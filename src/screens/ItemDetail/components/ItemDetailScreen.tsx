import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { ItemDetailProps } from '@base/types/Navigation/ItemDetail';

type MyMenuListInfoScreen = {
  navigation: ItemDetailProps['navigation'];
};

export default function MyMenuListInfoScreen({
  data,
  isMine,
  handleModifyPress,
}: MyMenuListInfoScreen) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}>
      {/* {isMine ? (
        <ItemDetailModifyMenu>
          <ItemDetailModifyNav>
            <ItemDetailModifyText>수정하기</ItemDetailModifyText>
          </ItemDetailModifyNav>
        </ItemDetailModifyMenu>
      ) : null} */}
      <ItemDetailModifyMenu>
        <ItemDetailModifyNav onPress={handleModifyPress}>
          <ItemDetailModifyText>수정하기</ItemDetailModifyText>
        </ItemDetailModifyNav>
      </ItemDetailModifyMenu>
      <ItemDetailHeader>
        <ItemDetailImg
          source={
            data.productionImg
              ? data.productionImg
              : require('@base/../assets/images/default_dessert_image.png')
          }
        />
        <ItemDetailTitleContainer>
          <ItemDetailStore>
            {data.storeName ? data.storeName : '가게명 없음'}
          </ItemDetailStore>
          <ItemDetailTitle>{data.productionName}</ItemDetailTitle>
        </ItemDetailTitleContainer>
      </ItemDetailHeader>
      <DetailContainer>
        <DetailRow>
          <DetailTitle>가격</DetailTitle>
          <DetailContent>{data.price ? data.price : 0}</DetailContent>
        </DetailRow>
      </DetailContainer>
      <DetailDescContainer>
        <DetailDescTitle>설명</DetailDescTitle>
        <DetailDescContent>
          {data.info ? data.info : '설명 없음'}
        </DetailDescContent>
      </DetailDescContainer>
    </ScrollView>
  );
}

const ItemDetailModifyMenu = styled.View`
  width: 100%;
`;

const ItemDetailModifyNav = styled.TouchableOpacity`
  align-self: flex-end;
  margin-right: 20px;
`;

const ItemDetailHeader = styled.View`
  width: 100%;
  align-items: center;
  padding: 10px 0px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`;

const ItemDetailModifyText = styled.Text`
  font-size: 15px;
  opacity: 0.5;
  font-family: 'BMHANNA';
`;

const ItemDetailImg = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 15px;
`;

const ItemDetailTitleContainer = styled.View`
  width: 100%;
`;

const ItemDetailStore = styled.Text`
  text-align: center;
  opacity: 0.6;
`;

const ItemDetailTitle = styled.Text`
  text-align: center;
  font-size: 25px;
  font-family: 'BMHANNA';
`;

const DetailContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: 20px 0px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const DetailTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 30px;
`;

const DetailContent = styled.Text`
  font-size: 17px;
  align-self: center;
`;

const DetailDescContainer = styled.View`
  width: 100%;
  padding: 20px 0px;
  align-items: flex-start;
`;

const DetailDescTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DetailDescContent = styled.Text``;
