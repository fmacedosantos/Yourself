import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { SummaryStats } from '../../components/views/SummaryStats';

export function Profile() {
  return (
    <View style={styles.container}>
      <SummaryStats/>
        <Text>Profile works</Text>
    </View>
  );
}