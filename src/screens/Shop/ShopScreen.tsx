import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './Shop.styles';
import { SummaryStats } from '../../components/SummaryStats';

export function Shop() {
  return (
    <View style={styles.container}>
      <SummaryStats/>
        <Text>Shop works</Text>
    </View>
  );
}