import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function ViewOffensiveExperienceStats() {
  return (
    <View style={styles.container}>
        <View style={styles.statItem}>
          <FontAwesome5 name="fire" size={24} color="orange" />
          <Text style={styles.statValue}>368 dias</Text>
        </View>

        <View style={styles.statItem}>
          <FontAwesome5 name="certificate" size={24} color="black"/>
          <Text style={styles.statValue}>2168 XP</Text>
        </View>
    </View>
  );
}