import React from 'react';
import { View, Button, Image } from 'react-native';
import { Props } from '../types/index';

export default function Initial({ route, navigation }: Props){
    return (
        <View>
            <Button 
                title="hello" 
                onPress={() => alert('hello')}
            />
        </View>
    )
}