import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Title } from '../../../../components/title';
import { SummaryStats } from '../../../../components/summaryStats';
import { Activity } from '../../../../components/activity';
import { styles } from './styles';
import { userService } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';

interface Atividade {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
}

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Home() {
  const [title, setTitle] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
      await userService.carregarAtividades(setAtividades);
      await userService.carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false); 
    }

    carregarDados();
  }, []);  

  function handleShowMore() {
    setShowMore(!showMore);
    setTitle(!title);
  } 

  if (loading) {
    return <LoadingScreen />; 
  }

  return (
    <View style={styles.container}>
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />

      <Title title={title ? 'Histórico' : 'Últimas atividades'} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {atividades.length === 0 ? (
          <Text style={styles.noActivitiesText}>Nenhuma atividade...</Text>
        ) : (
          <>
            {atividades.slice(0, showMore ? atividades.length : 5).map((atividade) => (
              <Activity
                key={atividade.id}
                titulo={atividade.titulo}
                categoria={atividade.categoria}
                pontos={atividade.pontos}
                dificuldade={atividade.dificuldade}
              />
            ))}
            {atividades.length > 5 && (
              <TouchableOpacity onPress={handleShowMore}>
                <Text style={styles.verMais}>{showMore ? 'Ver menos' : 'Ver mais...'}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
