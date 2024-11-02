import React from 'react';
import { Text, View, StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';

interface TitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export function Title ({ title, style }: TitleProps) {
  const defaultStyle = {};
  
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.titleText, style || defaultStyle]}>{title}</Text>
    </View>
  );
};
