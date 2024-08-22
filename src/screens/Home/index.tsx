import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { ButtonTask } from '../../components/ButtonTask';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.containerDetails}>
        <View style={styles.containerAchievements}>
          <FontAwesome5 name="fire" size={24} color="orange" />
          <Text style={styles.textAchievements}>368 dias</Text>
        </View>

        <View style={styles.containerAchievements}>
          <FontAwesome5 name="certificate" size={24} color="black"/>
          <Text style={styles.textAchievements}>2168 XP</Text>
        </View>
      </View>
      <ButtonTask/>
    </View>
  );
}