import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { DailyWeatherObject, CurrentWeatherObject } from '@base/types/weather';
import { PredictDataAPIResults } from '@base/types/predict';
import { weatherToKorean } from '@base/api/weather';
import styled from 'styled-components/native';

import WeatherIcon from '@base/components/WeatherIcon';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';
import SalesPredictItem from './SalesPredictItem';

const dateToString = ['오늘', '내일', '모레'];

type SalesPredictScreenProps = {
  navigation: SalesPredictProps['navigation'];
  weatherData: DailyWeatherObject | CurrentWeatherObject;
  predictData: PredictDataAPIResults;
  loading: boolean;
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
};

function SalesPredictScreen({
  navigation,
  weatherData,
  predictData,
  storeId,
  storeArray,
  onDateChange,
  onStoreChange,
  date,
}: SalesPredictScreenProps) {
  const weatherName = weatherToKorean[weatherData.weather.main];
  const storeItems = storeArray.map((store) => ({
    label: store.storeName,
    value: store.id,
  }));
  return (
    <SalesPredictContainer>
      <WeatherContainer>
        <WeatherTitle>{`${dateToString[date]}의 날씨`}</WeatherTitle>
        <WeatherIcon icon={weatherData.weather.icon} />
        <WeatherContent>{`${weatherData.temp}°C  ${weatherName}`}</WeatherContent>
      </WeatherContainer>
      <DropDownPickerWrapper>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={storeId}
          onValueChange={(value) => {
            onStoreChange(Number(value));
          }}>
          {storeItems.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </DropDownPickerWrapper>
      <DateSelector>
        <DateItem onPress={() => onDateChange(0)}>
          <DateText selected={date === 0}>오늘</DateText>
        </DateItem>
        <DateItem onPress={() => onDateChange(1)}>
          <DateText selected={date === 1}>내일</DateText>
        </DateItem>
        <DateItem onPress={() => onDateChange(2)}>
          <DateText selected={date === 2}>모레</DateText>
        </DateItem>
      </DateSelector>
      <MenuContainer>
        <MenuTitle>{`${dateToString[date]}의 예상 매출 Top`}</MenuTitle>
        <MenuItemContainer>
          {predictData
            ? predictData.map((data, index) => {
                const isLast = index === predictData.length - 1 ? true : false;
                return (
                  <SalesPredictItem
                    key={index}
                    rank={index + 1}
                    navigation={navigation}
                    storeId={storeId}
                    data={data}
                    isLast={isLast}
                  />
                );
              })
            : null}
        </MenuItemContainer>
      </MenuContainer>
    </SalesPredictContainer>
  );
}

const SalesPredictContainer = styled.View`
  background-color: white;
  flex: 1;
`;

const WeatherContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #c7ecee;
`;

const WeatherTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
`;

const WeatherContent = styled.Text`
  font-size: 20px;
  margin-top: 20px;
`;

const DropDownPickerWrapper = styled.View`
  width: 100%;
  align-items: center;
  background-color: #c7ecee;
  padding-bottom: 10px;
`;

const DateSelector = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 10px;
  border-bottom-color: 'rgba(0, 0, 0, 0.1)';
  border-bottom-width: 1px;
`;

const DateItem = styled.TouchableOpacity``;

const DateText = styled.Text`
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  font-size: 20px;
`;

const MenuContainer = styled.ScrollView`
  flex: 1;
  padding: 0px 20px;
  margin: 20px 0px;
`;

const MenuTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const MenuItemContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export default React.memo(SalesPredictScreen);
