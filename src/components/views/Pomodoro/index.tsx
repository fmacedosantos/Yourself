import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import icon from '../../../../assets/pictures/icon.png'
import { BackScreen } from '../../buttons/BackScreen';
import { SummaryStats } from '../SummaryStats';

export function Pomodoro({navigation}: any) {
  return (
    <View style={styles.container}>
      <SummaryStats/>
      <BackScreen navigation={navigation} style={styles.backButton}/>
        <Text style={styles.textTitle}>CONCENTRAÇÃO</Text>
        <Text style={styles.textTimer}>00:00</Text>
        <Image source={icon} style={styles.icon}/>
    </View>
  );
}