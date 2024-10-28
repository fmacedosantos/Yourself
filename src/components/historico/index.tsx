import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AtividadeComponentProps {
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
  data: string;
}

export const AtividadeComponent = ({
  titulo,
  categoria,
  pontos,
  dificuldade,
  data
}: AtividadeComponentProps) => {
  
  // Função para determinar a cor com base na dificuldade
  const getNivelColor = (dificuldade: number) => {
    switch (dificuldade) {
      case 1: return '#5DB075'; // Verde
      case 2: return '#F7A800'; // Amarelo
      case 3: return '#FF5733'; // Vermelho
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
        <Text style={styles.categoriaText}>{categoria} • {data}</Text>
      </View>

      <View style={[styles.nivelContainer, { backgroundColor: getNivelColor(dificuldade) }]}>
        <Text style={styles.nivelText}>Nível {dificuldade}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  atividadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '90%',
    alignSelf: 'center',
    minHeight: 60,
  },
  pontosContainer: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  pontosText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Itim-Regular',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  tituloText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Itim-Regular',
  },
  categoriaText: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Itim-Regular',
  },
  nivelContainer: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nivelText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Itim-Regular',
  },
});
