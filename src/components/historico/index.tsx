import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AtividadeComponentProps {
  minutos: number;
  nome: string;
  nivel: string;
  corNivel: string;
}

export const AtividadeComponent = ({ minutos, nome, nivel, corNivel }: AtividadeComponentProps) => {
  return (
    <View style={styles.atividadeContainer}>
      <View style={styles.minutosContainer}>
        <Text style={styles.minutosText}>{minutos}</Text>
      </View>

      <Text style={styles.nomeAtividade}>{nome}</Text>

      <View style={[styles.nivelContainer, { backgroundColor: corNivel }]}>
        <Text style={styles.nivelText}>{nivel}</Text>
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
    width: '70%', 
    alignSelf: 'center', 
    minHeight: 60, 
  },
  minutosContainer: {
    backgroundColor: '#4A90E2', 
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  minutosText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nomeAtividade: {
    flex: 1,
    marginLeft: 10, 
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nivelContainer: {
    backgroundColor: '#5DB075', 
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nivelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
