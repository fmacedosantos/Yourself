import React from 'react';
import { Text, View, StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';

interface TitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
}

export function Title ({ title, style, containerStyle }: TitleProps) {
  
  return (
    <View style={[styles.titleContainer, containerStyle]}>
      <Text style={[styles.titleText, style]}>{title}</Text>
    </View>
  );
};
