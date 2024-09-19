import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './Home.styles';
import { CircularBrowser } from '../../components/CircularBrowser';
import { SummaryStats } from '../../components/SummaryStats';

export function Home({navigation}: any) {
  return (
    <View style={styles.container}>
      <SummaryStats/>
      <CircularBrowser onPress={() => {
          navigation.navigate('tasks')
        }}/>

    </View>
  );
}