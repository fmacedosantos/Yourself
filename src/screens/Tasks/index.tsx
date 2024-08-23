import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import { ViewOffensiveExperienceStats } from '../../components/ViewOffensiveExperienceStats';

import icon from '../../../assets/pictures/icon.png'
import { ViewOffensiveExperienceStats } from '../../components/ViewOffensiveExperienceStats';

export function Tasks() {
  return (
    <View style={styles.container}>
        <ViewOffensiveExperienceStats/>
        <Image source={icon}/>
    </View>
  );
}