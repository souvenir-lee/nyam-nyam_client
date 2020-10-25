import React, { useState } from 'react';
import { DailyWeatherObject, CurrentWeatherObject } from '@base/types/api';
import styled from 'styled-components/native';

import DropDownPicker from 'react-native-dropdown-picker';
import WeatherIcon from '@base/components/WeatherIcon';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';

const dateToString = ['오늘', '내일', '모레'];

const weatherToKorean = {
  Thunderstorm: '번개',
  Drizzle: '소나기',
  Squall: '소나기',
  Tornado: '태풍',
  Rain: '비',
  Snow: '눈',
  Clear: '맑음',
  Clouds: '구름',
  Fog: '안개',
  Mist: '안개',
  Smoke: '안개',
  Haze: '안개',
  Sand: '황사',
  Dust: '황사',
};

type SalesPredictScreenProps = {
  navigation: SalesPredictProps['navigation'];
  data: DailyWeatherObject | CurrentWeatherObject;
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
};

export default function SalesPredictScreen({
  navigation,
  data,
  date,
  setDate,
}: SalesPredictScreenProps) {
  const weatherName = weatherToKorean[data.weather.main];
  return (
    <SalesPredictContainer>
      <WeatherContainer>
        <WeatherTitle>{`${dateToString[date]}의 날씨`}</WeatherTitle>
        <WeatherIcon icon={data.weather.icon} />
        <WeatherContent>{`${data.temp}°C  ${weatherName}`}</WeatherContent>
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
      <MenuContainer />
    </SalesPredictContainer>
  );
}

const SalesPredictContainer = styled.View`
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

const MenuContainer = styled.View`
  flex: 1;
`;
