import React, { useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

import { SalesUploadNavProps } from '@base/types/Navigation/MainNavigation';
import { MINT, MINT_STRONG } from '@base/baseColors';
import { weatherList } from '@base/api/weather';

type SalesUploadScreenProps = {
  navigation: SalesUploadNavProps['navigation'];
};

function formatDate(date) {
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
}

const width = Dimensions.get('window').width;

export default function SalesUploadScreen({
  storeArray,
  today,
  startDate,
  endDate,
  currentDate,
  currentData,
  store,
  weather,
  currentStore,
  storeItems,
  handleWeatherChange,
  handleStoreChange,
  handleShowCalendar,
  handleDateChange,
  handlePrevPress,
  handleNextPress,
  handleQuantityChange,
}: SalesUploadScreenProps) {
  return (
    <>
      <Container>
        <StoreWrapper>
          <RowTitle>가게 선택</RowTitle>
          {currentStore === null ? (
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={currentStore}
              onValueChange={(value) => {
                handleStoreChange(value);
              }}>
              <Picker.Item label={'가게를 선택해주세요'} value={null} />
              {storeArray.map((item, index) => (
                <Picker.Item
                  key={index + 1}
                  label={item.storeName}
                  value={item.id}
                />
              ))}
            </Picker>
          ) : (
            <RowContent>{store[currentStore].storeName}</RowContent>
          )}
        </StoreWrapper>
        {currentStore ? (
          <DateWrapper>
            <RowTitle>시작일</RowTitle>
            {startDate ? (
              <RowContent>{formatDate(startDate)}</RowContent>
            ) : (
              <DateSelector onPress={() => handleShowCalendar(0)}>
                <DateSelectorText>달력에서 선택하기</DateSelectorText>
              </DateSelector>
            )}
          </DateWrapper>
        ) : null}
        {startDate ? (
          <DateWrapper>
            <RowTitle>종료일</RowTitle>
            {endDate ? (
              <RowContent>{formatDate(endDate)}</RowContent>
            ) : (
              <DateSelector onPress={() => handleShowCalendar(1)}>
                <DateSelectorText>달력에서 선택하기</DateSelectorText>
              </DateSelector>
            )}
          </DateWrapper>
        ) : null}
        {endDate ? (
          <ContentContainer>
            <ContentTitle>{`${formatDate(
              currentDate
            )} 판매 내역`}</ContentTitle>
            <ContentHeader>
              <ContentSubheader>그 날의 날씨는?</ContentSubheader>
              <Picker
                style={{ height: 50, width: 110 }}
                selectedValue={weather}
                onValueChange={(value) => {
                  handleWeatherChange(Number(value));
                }}>
                <Picker.Item label={'날씨'} value={0} />
                {weatherList.map((item, index) => (
                  <Picker.Item key={index} label={item} value={index + 1} />
                ))}
              </Picker>
            </ContentHeader>
            <ContentListTitle>
              <ContentListText index={0} />
              <ContentListText index={1}>디저트명</ContentListText>
              <ContentListText index={2}>갯수</ContentListText>
            </ContentListTitle>
            <ScrollView style={{ marginBottom: 150 }}>
              {storeItems.length
                ? storeItems.map((item, index) => (
                    <ContentRow key={index}>
                      <RowImageWrapper>
                        <RowImage
                          source={
                            item.production.productionImg
                              ? { uri: item.production.productionImg }
                              : require('@base/../assets/images/default_dessert_image.png')
                          }
                          resizeMode="contain"
                        />
                      </RowImageWrapper>
                      <RowDessertName>
                        {item.production.productionName}
                      </RowDessertName>
                      <RowAmountWrapper>
                        <RowAmount
                          keyboardType="numeric"
                          maxLength={7}
                          defaultValue="0"
                          value={String(currentData[index][1])}
                          onChangeText={(text) =>
                            handleQuantityChange(
                              index,
                              item.productionId,
                              Number(text)
                            )
                          }
                        />
                      </RowAmountWrapper>
                    </ContentRow>
                  ))
                : null}
            </ScrollView>
          </ContentContainer>
        ) : null}
      </Container>
      {startDate && endDate && weather ? (
        formatDate(currentDate) === formatDate(endDate) ? (
          <SubmitButton onPress={() => handleNextPress(true)}>
            <SubmitText>업로드</SubmitText>
          </SubmitButton>
        ) : (
          <>
            <NavButton onPress={handlePrevPress} isLeft={true}>
              <SubmitText>이전</SubmitText>
            </NavButton>
            <NavButton onPress={() => handleNextPress(false)}>
              <SubmitText>다음</SubmitText>
            </NavButton>
          </>
        )
      ) : null}
    </>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px 20px 30px 20px;
  align-items: center;
`;

const StoreWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const RowTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
`;
const RowContent = styled.Text`
  font-size: 15px;
`;

const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const DateSelector = styled.TouchableOpacity`
  padding: 7px;
  border-radius: 5px;
  background-color: ${MINT_STRONG};
`;

const DateSelectorText = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const ContentTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ContentSubheader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
`;

const ContentListTitle = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${MINT_STRONG};
  padding-bottom: 15px;
`;

const ContentListText = styled.Text`
  width: ${(props) => {
    switch (props.index) {
      case 0:
        return '30%';
      case 1:
        return '40%';
      case 2:
        return '30%';
    }
  }};
  font-size: 20px;
  font-weight: bold;
`;

const ContentRow = styled.View`
  width: 100%;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${MINT};
`;

const RowImageWrapper = styled.View`
  width: 30%;
`;

const RowImage = styled.Image`
  width: ${width * 0.2}px;
  height: ${width * 0.2}px;
`;

const RowDessertName = styled.Text`
  width: 40%;
  font-size: 20px;
  font-weight: bold;
`;

const RowAmountWrapper = styled.View`
  width: 30%;
`;

const RowAmount = styled.TextInput`
  width: 75px;
  height: 50px;
  padding: 3%;
  background: white;
  margin-bottom: 3%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
`;

const NavButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.isLeft ? '0' : '50%')};
  width: 50%;
  height: 40px;
  justify-content: center;
  background-color: 'rgba(52, 152, 219,1.0)';
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
