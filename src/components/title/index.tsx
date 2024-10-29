import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { styles } from './styles';

interface TitleProps {
  title: string;
}

export function Title ({ title }: TitleProps) {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{title}</Text>
    </View>
  );
};
