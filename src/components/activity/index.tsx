import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';

interface ActivityProps {
  titulo: string;
  categoria: string
  pontos: number;
  dificuldade: number;
  acao: () => void;
}

export const Activity = ({
  titulo,
  categoria,
  pontos,
  dificuldade,
  acao
}: ActivityProps) => {
  
  const getLevelColor = (dificuldade: number) => {
    switch (dificuldade) {
      case 1: return '#5DB075'; 
      case 2: return '#F7A800'; 
      case 3: return '#FF5733'; 
      default: return '#333';
    }
  };

  const getTextLevel = (dificuldade: number) => {
    switch (dificuldade) {
      case 1: return 'I';
      case 2: return 'II';
      case 3: return 'III';
      default: return '8'
    }
  }

  return (
    <Pressable onPress={acao} style={styles.atividadeContainer}>
      <View style={styles.pontosContainer}>
        <Text style={styles.pontosText}>{pontos}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.tituloText}>{titulo}</Text>
        <Text style={styles.categoriaText}>{categoria}</Text>
      </View>

      <View style={[styles.nivelContainer, { backgroundColor: getLevelColor(dificuldade) }]}>
        <Text style={styles.nivelText}>{getTextLevel(dificuldade)}</Text>
      </View>
    </Pressable>
  );
};


