import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface backScreenProps{
  navigation: any
  style?: any
}

export function BackScreen({ navigation, style }: backScreenProps) {
    const goBack = () => {
        navigation.goBack()
      }

  return (
    <Text onPress={goBack} style={[styles.closeView, style]}>Sair</Text>
  );
}