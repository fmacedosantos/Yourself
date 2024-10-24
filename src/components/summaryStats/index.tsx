import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './style';
import FireIcon from '../../assets/images/fire-icon.svg'
import XpIcon from '../../assets/images/xp-icon.svg'

export function SummaryStats() {
  return (
    <View style={styles.container}>
        <View style={styles.statItem}>
          <FireIcon width={24} height={24}/>
          <Text style={styles.statValue}>368 dias</Text>
        </View>

        <View style={styles.statItem}>
          <XpIcon width={24} height={24}/>
          <Text style={styles.statValue}>2168 XP</Text>
        </View>
    </View>
  );
}