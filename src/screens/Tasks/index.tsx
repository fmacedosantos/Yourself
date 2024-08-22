import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { ViewOffensiveExperienceStats } from '../../components/ViewOffensiveExperienceStats';

export function Tasks() {
  return (
    <View style={styles.container}>
      <ViewOffensiveExperienceStats/>
      <Text>Works!</Text>
    </View>
  );
}