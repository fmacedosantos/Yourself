import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import icon from '../../../assets/pictures/icon.png'

export function ViewPomodoro({onClose}: any) {
  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>CONCENTRAÇÃO</Text>
        <Text style={styles.textTimer}>00:00</Text>
        <Image source={icon} style={styles.icon}/>
    </View>
  );
}