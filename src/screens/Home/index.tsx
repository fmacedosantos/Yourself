import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonCreateTask}>
            <Text style={styles.textCreateTask}>+</Text>
        </TouchableOpacity>
    </View>
  );
}