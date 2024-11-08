import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Settings() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
      userService.carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false)
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }
 return (
  <View
  style={styles.container}
  >
    <SummaryStats 
      ofensiva={resumoEstatisticas.ofensiva} 
      pontos={resumoEstatisticas.pontos}
    />
</View>
  );
}
