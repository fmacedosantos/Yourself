import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export function ButtonTask() {
  return (
    <TouchableOpacity style={styles.buttonCreateTask}>
      <Text style={styles.textCreateTask}>+</Text>
    </TouchableOpacity>
  );
}