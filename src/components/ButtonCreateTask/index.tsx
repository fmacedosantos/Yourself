import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export function ButtonCreateTask({onPress}: any) {
  return (
    <TouchableOpacity style={styles.buttonCreateTask}
        onPress={onPress}>
    <Text style={styles.textCreateTask}>CRIAR TAREFA</Text>
    </TouchableOpacity>
  );
}