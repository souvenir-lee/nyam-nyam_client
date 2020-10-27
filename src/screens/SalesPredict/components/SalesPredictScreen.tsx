import React, { useState } from 'react';
import { DailyWeatherObject, CurrentWeatherObject } from '@base/types/weather';
import { PredictDataAPIResults } from '@base/types/predict';
import { weatherToKorean } from '@base/api/weather';
import styled from 'styled-components/native';

import DropDownPicker from 'react-native-dropdown-picker';
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

export default function SalesPredictScreen({
  navigation,
  weatherData,
  date,
  predictData,
  setDate,
}: SalesPredictScreenProps) {
  const weatherName = weatherToKorean[weatherData.weather.main];
  console.log(predictData);
  return (
    <SalesPredictContainer>
      <WeatherContainer>
        <WeatherTitle>{`${dateToString[date]}의 날씨`}</WeatherTitle>
        <WeatherIcon icon={weatherData.weather.icon} />
        <WeatherContent>{`${weatherData.temp}°C  ${weatherName}`}</WeatherContent>
      </WeatherContainer>
      <DropDownPickerWrapper>
        <DropDownPicker
          items={[
            { label: '파리바게트', value: '파리바게트' },
            { label: '뚜레쥬르', value: '뚜레쥬르' },
          ]}
          defaultValue={'파리바게트'}
          containerStyle={{ height: 40 }}
          style={{ width: '65%' }}
          labelStyle={{ textAlign: 'center' }}
          dropDownStyle={{ width: '65%' }}
          onChangeItem={(item) => console.log(item)}
        />
      </DropDownPickerWrapper>
      <DateSelector>
        <DateItem onPress={() => setDate(0)}>
          <DateText selected={date === 0}>오늘</DateText>
        </DateItem>
        <DateItem onPress={() => setDate(1)}>
          <DateText selected={date === 1}>내일</DateText>
        </DateItem>
        <DateItem onPress={() => setDate(2)}>
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
  z-index: 100;
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
