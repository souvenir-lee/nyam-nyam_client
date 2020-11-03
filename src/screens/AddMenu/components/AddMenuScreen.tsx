import React from 'react';
import { ScrollView, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Picker } from '@react-native-community/picker';
import { Button } from 'react-native-elements';

import { AddMenuProps } from '@base/types/Navigation/MyPageNavigation';
import { idToDessertType, idToIngredients } from '@base/api/item';
import {
  MINT,
  MINT_RGBA_LINE,
  MINT_STRONG,
  MINT_STRONG_RGBA_LINE,
} from '@base/baseColors';

type AddMenuScreenProps = {
  navigation: AddMenuProps['navigation'];
};

export default function AddMenuScreen({
  data,
  store,
  loading,
  image,
  onChange,
  onDelete,
  pickImage,
  handleGoBack,
  handleSubmit,
}: AddMenuScreenProps) {
  const {
    storeId,
    productionName,
    price,
    info,
    dessertType,
    ingredient1,
    ingredient2,
  } = data;

  console.log('data', data);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}>
        <ItemModifyHeader>
          <ImageWrapper onPress={pickImage}>
            <ItemModifyImg
              source={
                image && image.uri
                  ? { uri: image.uri }
                  : require('@base/../assets/images/default_dessert_image.png')
              }
            />
            <ImageBackground />
            <BackgroundText>사진 추가</BackgroundText>
          </ImageWrapper>
          <ItemModifyTitleContainer>
            <DropDownPickerWrapper>
              <Picker
                style={{ height: 50, width: 200 }}
                selectedValue={storeId}
                onValueChange={(value) => {
                  onChange('storeId', Number(value));
                }}>
                {store.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.storeName}
                    value={item.id}
                  />
                ))}
              </Picker>
            </DropDownPickerWrapper>
            <TitleInput
              placeholder={'메뉴 이름'}
              onChangeText={(text) => onChange('productionName', text)}
              value={productionName}
            />
          </ItemModifyTitleContainer>
        </ItemModifyHeader>
        <DetailContainer>
          <DetailRow>
            <DetailTitle>가격</DetailTitle>
            <DetailInput
              placeholder={'가격(원)'}
              keyboardType="numeric"
              maxLength={7}
              onChangeText={(text) => onChange('price', text)}
              value={price.toString()}
            />
          </DetailRow>
          <DetailRow>
            <DetailTitle>디저트 종류</DetailTitle>
            <Picker
              style={{ width: 150, color: MINT_STRONG, fontSize: 17 }}
              selectedValue={dessertType}
              onValueChange={(value) => {
                onChange('dessertType', Number(value));
              }}>
              {idToDessertType.map((type, index) => (
                <Picker.Item label={type} value={index} />
              ))}
            </Picker>
          </DetailRow>
          <DetailRow last={true}>
            <DetailTitle>주재료</DetailTitle>
            <Picker
              style={{ width: 150, color: MINT_STRONG, fontSize: 17 }}
              selectedValue={ingredient2 ? ingredient2 : ingredient1}
              onValueChange={(value) => {
                console.log(value);
                if (ingredient2) {
                  Alert.alert('주재료는 최대 2개 선택 가능합니다.');
                } else {
                  if (ingredient1) {
                    onChange('ingredient2', Number(value));
                  } else {
                    onChange('ingredient1', Number(value));
                  }
                }
              }}>
              {idToIngredients.map((type, index) => (
                <Picker.Item key={index} label={type} value={index + 1} />
              ))}
            </Picker>
          </DetailRow>
          <PickedIngredientWrapper>
            {ingredient1 ? (
              <PickedIngredient
                onPress={() => {
                  onDelete('ingredient1');
                  if (ingredient2) {
                    onChange('ingredient1', ingredient2);
                    onDelete('ingredient2');
                  }
                }}>
                <PickedIngredientText>
                  {idToIngredients[ingredient1 - 1]}
                </PickedIngredientText>
                <CancelText>X</CancelText>
              </PickedIngredient>
            ) : null}
            {ingredient2 ? (
              <PickedIngredient onPress={() => onDelete('ingredient2')}>
                <PickedIngredientText>
                  {idToIngredients[ingredient2 - 1]}
                </PickedIngredientText>
                <CancelText>X</CancelText>
              </PickedIngredient>
            ) : null}
          </PickedIngredientWrapper>
        </DetailContainer>
        <DetailDescContainer>
          <DetailDescTitle>설명</DetailDescTitle>
          <TextInput
            value={info}
            onChangeText={(text) => onChange('info', text)}
            maxLength={200}
            multiline={true}
            textAlignVertical="top"
            placeholder="내용을 입력하세요."
            style={{
              width: '100%',
              minHeight: 200,
              padding: '3%',
              borderWidth: 1,
              borderColor: MINT_STRONG_RGBA_LINE,
              fontSize: 15,
              color: MINT_STRONG,
            }}
          />
        </DetailDescContainer>
      </ScrollView>
      <Button
        title="추가"
        type="solid"
        loading={loading}
        titleStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        buttonStyle={{ backgroundColor: MINT_STRONG }}
        onPress={handleSubmit}
      />
    </>
  );
}

const ItemModifyModifyMenu = styled.View`
  width: 100%;
`;

const ItemModifyHeader = styled.View`
  width: 100%;
  align-items: center;
  padding: 20px 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${MINT_RGBA_LINE};
`;

const DropDownPickerWrapper = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 10px;
`;

const ImageBackground = styled.View`
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: black;
  opacity: 0.4;
  border-radius: 5px;
`;
const BackgroundText = styled.Text`
  position: absolute;
  color: white;
  font-weight: bold;
  font-size: 20px;
  opacity: 0.9;
`;

const ImageWrapper = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const ItemModifyImg = styled.Image`
  width: 130px;
  height: 130px;
  margin-bottom: 15px;
`;

const ItemModifyTitleContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const TitleInput = styled.TextInput`
  width: 50%;
  padding: 2%;
  font-size: 20px;
  font-weight: bold;
  background: white;
  border-bottom-width: 2px;
  border-bottom-color: ${MINT_STRONG_RGBA_LINE};
  text-align: center;
  color: ${MINT_STRONG};
`;

const ItemModifyStore = styled.Text`
  text-align: center;
  color: ${MINT};
  font-size: 15px;
  margin-bottom: 5px;
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
  align-items: center;
  margin-bottom: ${(props) => (props.last ? '5px' : '15px')};
`;

const DetailTitle = styled.Text`
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 30px;
  color: ${MINT_STRONG};
`;

const DetailInput = styled.TextInput`
  width: 50%;
  padding: 2%;
  font-size: 17px;
  font-weight: bold;
  background: white;
  border-bottom-width: 2px;
  border-bottom-color: ${MINT_STRONG_RGBA_LINE};
  color: ${MINT_STRONG};
`;

const PickedIngredientWrapper = styled.View`
  flex-direction: row;
`;

const PickedIngredient = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${MINT};
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
`;

const PickedIngredientText = styled.Text`
  margin-right: 5px;
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

const CancelText = styled.Text`
  color: red;
`;

const DetailDescContainer = styled.View`
  width: 100%;
  padding: 20px 0px;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const DetailDescTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${MINT_STRONG};
  margin-bottom: 20px;
`;

const DetailDescInput = styled.TextInput`
  width: 100%;
  flex: 1;
  min-height: 300px;
  padding: 3%;
  background: white;
  margin-bottom: 3%;
  border: 1px solid ${MINT_STRONG_RGBA_LINE};
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold;
  color: ${MINT};
  text-align: auto;
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  justify-content: center;
  background-color: 'rgba(52, 152, 219,1.0)';
`;

const SubmitText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
