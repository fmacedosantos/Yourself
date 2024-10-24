import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface TituloProps {
  title: string;
}

export const TituloComponent: React.FC<TituloProps> = ({ title }) => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Ajusta o espaço embaixo da logo
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Itim-Regular' 
  },
});