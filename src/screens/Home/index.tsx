import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { ButtonTask } from '../../components/ButtonTask';
import { ViewSummaryStats } from '../../components/ViewSummaryStats';

export function Home() {
  return (
    <View style={styles.container}>
      <ViewSummaryStats/>
      <ButtonTask/>
    </View>
  );
}