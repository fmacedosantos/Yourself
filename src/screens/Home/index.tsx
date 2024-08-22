import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { ButtonTask } from '../../components/ButtonTask';
import { ViewOffensiveExperienceStats } from '../../components/ViewOffensiveExperienceStats';

export function Home() {
  return (
    <View style={styles.container}>
      <ViewOffensiveExperienceStats/>
      <ButtonTask/>
    </View>
  );
}