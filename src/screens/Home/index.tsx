import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { CircularBrowser } from '../../components/buttons/CircularBrowser';
import { SummaryStats } from '../../components/views/SummaryStats';

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