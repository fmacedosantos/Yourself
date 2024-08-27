import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { SummaryStats } from '../../components/views/SummaryStats';

export function Shop() {
  return (
    <View style={styles.container}>
      <SummaryStats/>
        <Text>Shop works</Text>
    </View>
  );
}