import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemDetailParamList } from '../types/Navigation/ItemDetail';
import ItemDetail from '@base/screens/ItemDetail';
import ItemModify from '@base/screens/ItemModify';

const ItemDetailNavStack = createStackNavigator<ItemDetailParamList>();

export default function ItemDetailNavigation() {
  return (
    <ItemDetailNavStack.Navigator>
      <ItemDetailNavStack.Screen name="ItemDetail" component={ItemDetail} />
      <ItemDetailNavStack.Screen name="ItemModify" component={ItemModify} />
    </ItemDetailNavStack.Navigator>
  );
}
