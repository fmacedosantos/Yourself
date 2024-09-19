import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './Profile.styles';
import { SummaryStats } from '../../components/SummaryStats';

export function Profile() {
  return (
    <View style={styles.container}>
      <SummaryStats/>
        <Text>Profile works</Text>
    </View>
  );
}