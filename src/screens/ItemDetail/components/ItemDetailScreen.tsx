import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { ItemDetailProps } from '@base/types/Navigation/ItemDetail';
import { idToDessertType } from '@base/api/item';
import { MINT, MINT_STRONG, MINT_RGBA_LINE } from '@base/baseColors';

type MyMenuListInfoScreen = {
  navigation: ItemDetailProps['navigation'];
};

export default function ItemDetailScreen({
  data,
  storeName,
  isMine,
  handleGoBack,
  handleModifyPress,
}: MyMenuListInfoScreen) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}>
      <ItemDetailModifyMenu>
        <HeaderBackButton
          onPress={handleGoBack}
          tintColor={MINT}
          pressColorAndroid={MINT}
          style={{ position: 'absolute', left: -20 }}
        />
        {isMine ? (
          <ItemDetailModifyNav onPress={handleModifyPress}>
            <ItemDetailModifyText>수정하기</ItemDetailModifyText>
          </ItemDetailModifyNav>
        ) : null}
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
            {storeName ? storeName : '가게명 없음'}
          </ItemDetailStore>
          <ItemDetailTitle>{data.productionName}</ItemDetailTitle>
        </ItemDetailTitleContainer>
      </ItemDetailHeader>
      <DetailContainer>
        <DetailRow>
          <DetailTitle>가격</DetailTitle>
          <DetailContent>{`${
            data.price ? data.price : 0
          }원 (개당)`}</DetailContent>
        </DetailRow>
        <DetailRow>
          <DetailTitle>디저트 종류</DetailTitle>
          <DetailContent>{idToDessertType[data.dessertType]}</DetailContent>
        </DetailRow>
        <DetailRow last={true}>
          <DetailTitle>주재료</DetailTitle>
          <IngredientWrapper>
            {data.ingredients.map((ingredient, index) => (
              <Ingredient key={index}>{ingredient.name}</Ingredient>
            ))}
          </IngredientWrapper>
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
  flex-direction: row;
  justify-content: flex-end;
`;

const ItemDetailModifyNav = styled.TouchableOpacity`
  align-self: flex-end;
`;

const ItemDetailHeader = styled.View`
  width: 100%;
  align-items: center;
  padding: 20px 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${MINT_RGBA_LINE};
`;

const ItemDetailModifyText = styled.Text`
  font-size: 15px;
  font-family: 'BMHANNA';
  color: ${MINT};
`;

const ItemDetailImg = styled.Image`
  width: 130px;
  height: 130px;
  margin-bottom: 15px;
`;

const ItemDetailTitleContainer = styled.View`
  width: 100%;
`;

const ItemDetailStore = styled.Text`
  text-align: center;
  color: ${MINT};
  font-size: 15px;
  margin-bottom: 5px;
`;

const ItemDetailTitle = styled.Text`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: ${MINT_STRONG};
`;

const DetailContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: 30px 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${MINT_RGBA_LINE};
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${(props) => (props.last ? '0px' : '15px')};
`;

const DetailTitle = styled.Text`
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 30px;
  color: ${MINT_STRONG};
`;

const DetailContent = styled.Text`
  font-size: 17px;
  align-self: center;
  color: ${MINT_STRONG};
`;

const IngredientWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Ingredient = styled.Text`
  font-size: 15px;
  background-color: ${MINT};
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
`;

const DetailDescContainer = styled.View`
  width: 100%;
  padding: 20px 0px;
  align-items: flex-start;
`;

const DetailDescTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${MINT_STRONG};
  margin-bottom: 20px;
`;

const DetailDescContent = styled.Text`
  font-size: 17px;
  color: ${MINT_STRONG};
`;
