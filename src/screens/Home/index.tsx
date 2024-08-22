import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { ButtonTask } from '../../components/ButtonTask';

export function Home() {
  return (
    <View style={styles.container}>
      <ButtonTask/>
    </View>
  );
}