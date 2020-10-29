import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { ItemDetailParamList } from '../types/Navigation/ItemDetail';
import ItemDetail from '@base/screens/ItemDetail';
import ItemModify from '@base/screens/ItemModify';

const ItemDetailNavStack = createStackNavigator<ItemDetailParamList>();

export default function ItemDetailNavigation() {
  return (
    <ItemDetailNavStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: 'white' },
      }}>
      <ItemDetailNavStack.Screen name="ItemDetail" component={ItemDetail} />
      <ItemDetailNavStack.Screen name="ItemModify" component={ItemModify} />
    </ItemDetailNavStack.Navigator>
  );
}
