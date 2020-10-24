import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SalesPredict from '@base/screens/SalesPredict';
import { SalesPredictStackParamList } from '@base/types/Navigation/SalesPredictNavigation';
import ItemDetail from './ItemDetail';

const SalesPredictStack = createStackNavigator<SalesPredictStackParamList>();

export default function salesPredictNavigation() {
  return (
    <SalesPredictStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SalesPredictStack.Screen name="SalesPredict" component={SalesPredict} />
      <SalesPredictStack.Screen name="ItemDetailNav" component={ItemDetail} />
    </SalesPredictStack.Navigator>
  );
}
