import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { RoundedButtonCreateTask } from '../../components/RoundedButtonCreateTask';
import { ViewSummaryStats } from '../../components/ViewSummaryStats';

export function Home({navigation}: any) {
  return (
    <View style={styles.container}>
      <ViewSummaryStats/>
      <RoundedButtonCreateTask onPress={() => {
          navigation.navigate('tasks')
        }}/>

    </View>
  );
}