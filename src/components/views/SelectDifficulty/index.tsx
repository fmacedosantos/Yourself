import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export function SelectDifficulty({style}: any) {

  return (
    <View style={[styles.container, style]}>
      {/**usar SegmentedButtons */}
        <TouchableOpacity style={styles.buttonDifficulty}>
            <Text onPress={() => Alert.alert('Dificuldade', 'Fácil')}>Fácil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDifficulty}>
            <Text onPress={() => Alert.alert('Dificuldade', 'Médio')}>Médio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDifficulty}>
        <Text  onPress={() => Alert.alert('Dificuldade', 'Difícil')}>Difícil</Text>
        </TouchableOpacity>
    </View>
  );
}