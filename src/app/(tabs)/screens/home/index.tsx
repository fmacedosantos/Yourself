import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Title } from '../../../../components/title';
import { SummaryStats } from '../../../../components/summaryStats';
import { Activity } from '../../../../components/activity';
import { styles } from './styles';
import LoadingScreen from '@/src/components/loadindScreen';
import { carregarAtividades, carregarResumoEstatisticas, deleteActivity } from '@/src/services/api/user';
import { MessageAlert } from '@/src/components/messageAlert';
import { LoadFont } from '@/src/utils/loadFont';

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
  const [refreshing, setRefreshing] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<1 | 2>(2);
  
  const [activityIdToDelete, setActivityIdToDelete] = useState<string | null>(null);

  const carregarDados = useCallback(async (isRefresh: boolean = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      setLoading(true);
      const { success, message } = await carregarResumoEstatisticas(setResumoEstatisticas);
      if (!success) {
        setMessage(message);
        setVisible(true);
        return;
      }
      await carregarAtividades(setAtividades);
    } catch {
      setMessage('Erro ao carregar informações.');
      setVisible(true);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregarDados(); 
  }, []); 

  const handleRefresh = () => {
    carregarDados(true); 
  };

  function handleShowMore() {
    setShowMore(!showMore);
    setTitle(!title);
  } 

  function handleTouchActivity(id: string, titulo: string) {
    setType(2);
    setActivityIdToDelete(id);
    setVisible(true);
    setMessage(`Deseja excluir a atividade \"${titulo}\"?`); 
  }

  async function handleDeleteActivity() {
    if (activityIdToDelete) {
      setLoading(true);
      const response = await deleteActivity(activityIdToDelete);
      if (response.success) {
        setAtividades(atividades.filter((atividade) => atividade.id !== activityIdToDelete)); 
        setVisible(false);
        setLoading(false);
      } else {
        setLoading(false);
        setType(1);
        setMessage(response.message || "Erro ao deletar a atividade.");
      }
      setActivityIdToDelete(null); 
    }
  }

  const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
      style={styles.scrool}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />

      <Title title={title ? 'Histórico' : 'Últimas atividades'} />

      
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
                acao={() => handleTouchActivity(atividade.id, atividade.titulo)}
              />
            ))}
            {atividades.length > 5 && (
              <TouchableOpacity onPress={handleShowMore}>
                <Text style={styles.verMais}>{showMore ? 'Ver menos' : 'Ver mais...'}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <MessageAlert
          type={type}
          message={message}
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={() => handleDeleteActivity()}
        />

      </ScrollView>
    </View>
  );
}
