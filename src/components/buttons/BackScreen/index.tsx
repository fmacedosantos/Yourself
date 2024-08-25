import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function BackScreen({ navigation }: any) {
    const goBack = () => {
        navigation.goBack()
      }

  return (
    <Text onPress={goBack} style={styles.closeView}>Sair</Text>
  );
}