import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface ActivityProps {
  titulo: string;
  pontos: number;
  dificuldade: number;
}

export const Activity = ({
  titulo,
  pontos,
  dificuldade
}: ActivityProps) => {
  
  const getNivelColor = (dificuldade: number) => {
    switch (dificuldade) {
      case 1: return '#5DB075'; 
      case 2: return '#F7A800'; 
      case 3: return '#FF5733'; 
      default: return '#333';
    }
  };

  return (
    <View style={styles.atividadeContainer}>
      <View style={styles.pontosContainer}>
        <Text style={styles.pontosText}>{pontos}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.tituloText}>{titulo}</Text>
      </View>

      <View style={[styles.nivelContainer, { backgroundColor: getNivelColor(dificuldade) }]}>
        <Text style={styles.nivelText}>Nível {dificuldade}</Text>
      </View>
    </View>
  );
};


