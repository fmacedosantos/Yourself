import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

interface ButtonCreateTaskProps{
  text: string
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: any
}

export function RectangularBrowser({text, onPress, style}: ButtonCreateTaskProps) {
  return (
    <TouchableOpacity style={[styles.buttonCreateTask, style]}
        onPress={onPress}>
        <Text style={styles.textCreateTask}>{text}</Text>
    </TouchableOpacity>
  );
}