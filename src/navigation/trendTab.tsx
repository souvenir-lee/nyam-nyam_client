import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import trendAll from '@base/screens/TrendAll';
import trendSignature from './trendSignature';
import { TrendTabParamList } from '@base/types/Navigation/TrendTabNavigation';
import { MINT, MINT_STRONG } from '@base/baseColors';

const TrendTab = createMaterialTopTabNavigator<TrendTabParamList>();

const TrendTabNavigation = () => {
  return (
    <TrendTab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          borderBottomWidth: 2,
          borderBottomColor: MINT_STRONG,
        },
        pressColor: MINT,
      }}>
      <TrendTab.Screen
        name="TrendAll"
        component={trendAll}
        options={{
          title: '전체',
        }}
      />
      <TrendTab.Screen
        name="TrendSignatureNav"
        component={trendSignature}
        options={{
          title: '시그니처',
        }}
      />
    </TrendTab.Navigator>
  );
};

export default TrendTabNavigation;
