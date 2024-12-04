import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import FireIcon from '../../assets/images/fire.svg'
import XpIcon from '../../assets/images/xp.svg'

interface SummaryStatsProps {
  ofensiva: number,
  pontos: number
}

export function SummaryStats({ofensiva, pontos}: SummaryStatsProps) {
  return (
    <View style={styles.container}>
        <View style={styles.statItem}>
          <FireIcon width={24} height={24}/>
          <Text style={styles.statValue}>{ofensiva} dias</Text>
        </View>

        <View style={styles.statItem}>
          <XpIcon width={24} height={24}/>
          <Text style={styles.statValue}>{pontos} XP</Text>
        </View>
    </View>
  );
}