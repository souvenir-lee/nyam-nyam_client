import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import trendSignature from '@base/screens/TrendSignature';
import trendMore from '@base/screens/TrendMore';
import itemDetailNav from './ItemDetail';

import { TrendSignatureParamList } from '@base/types/Navigation/TrendSignatureNavigation';

const TrendSignatureStack = createStackNavigator<TrendSignatureParamList>();

export default function TrendSignatureNav() {
  return (
    <TrendSignatureStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <TrendSignatureStack.Screen
        name="TrendSignature"
        component={trendSignature}
      />
      <TrendSignatureStack.Screen name="TrendMore" component={trendMore} />
      <TrendSignatureStack.Screen
        name="ItemDetailNav"
        component={itemDetailNav}
      />
    </TrendSignatureStack.Navigator>
  );
}
