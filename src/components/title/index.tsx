import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface TitleProps {
  title: string;
}

export function Title ({ title }: TitleProps) {
  
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};
