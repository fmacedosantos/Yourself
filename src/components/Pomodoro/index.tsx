import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import pomodoroIcon from '../../../assets/pictures/tomato-icon.png'
import { BackScreen } from '../BackScreen';
import { SummaryStats } from '../SummaryStats';

export function Pomodoro({navigation}: any) {
  return (
    <View style={styles.container}>
      <SummaryStats/>
      <BackScreen navigation={navigation} style={styles.backButton}/>
        <Text style={styles.textTitle}>CONCENTRAÇÃO</Text>
        <Text style={styles.textTimer}>00:00</Text>
        <Image source={pomodoroIcon} style={styles.icon}/>
    </View>
  );
}