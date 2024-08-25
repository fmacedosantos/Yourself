import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

interface ButtonCreateTaskProps{
  text: string
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

export function RectangularBrowser({text, onPress}: ButtonCreateTaskProps) {
  return (
    <TouchableOpacity style={styles.buttonCreateTask}
        onPress={onPress}>
    <Text style={styles.textCreateTask}>{text}</Text>
    </TouchableOpacity>
  );
}