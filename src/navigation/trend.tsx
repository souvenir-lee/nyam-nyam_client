import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import TrendTab from './trendTab';
import Search from './search';
import { TrendStackParamList } from '@base/types/Navigation/TrendNavigation';

import TrendHeader from '@base/components/TrendHeader';
import { MINT_RGBA_LINE } from '@base/baseColors';

const TrendStack = createStackNavigator<TrendStackParamList>();

export default function TrendNavigation() {
  return (
    <TrendStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          shadowColor: 'transparent',
          borderBottomColor: MINT_RGBA_LINE,
          borderBottomWidth: 2,
          height: 70,
        },
        headerStatusBarHeight: 0,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <TrendStack.Screen
        name="TrendTab"
        component={TrendTab}
        options={{
          header: ({ navigation }) => <TrendHeader navigation={navigation} />,
        }}
      />
      <TrendStack.Screen
        name="SearchNav"
        component={Search}
        options={{ headerShown: false }}
      />
    </TrendStack.Navigator>
  );
}
