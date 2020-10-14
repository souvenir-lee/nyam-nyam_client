import React from 'react';
import { View, Button, Image, Alert } from 'react-native';
import { Props } from '../types/index';

export default function Initial({ route, navigation }: Props) {
  return (
    <View>
      <Button title="hello" onPress={() => Alert.alert('hello')} />
    </View>
  );
}
