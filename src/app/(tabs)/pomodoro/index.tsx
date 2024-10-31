import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { SummaryStats } from '@/src/components/summaryStats';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import { useLocalSearchParams } from 'expo-router';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Pomodoro() {
  const { titulo, descricao, selectedDifficulty, categoria } = useLocalSearchParams();
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });

  const difficultyLevel = Number(selectedDifficulty);

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
  }, []);  

  return (
    <View style={styles.container}>
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <Text>Título: {titulo}</Text>
      <Text>Descrição: {descricao}</Text>
      <Text>Nível de Dificuldade: {difficultyLevel}</Text>
      <Text>Categoria: {categoria}</Text>
    </View>
  );
}
