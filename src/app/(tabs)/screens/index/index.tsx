import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Title } from '../../../../components/title';
import { SummaryStats } from '../../../../components/summaryStats';
import { Activity } from '../../../../components/activity';
import { fetchWithAuth } from '../../../../utils/fetchWithAuth';
import { ROUTES, Paths } from '@/src/constants/Routes';
import { styles } from './styles';

interface Atividade {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
  data: string;
}

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });

  useEffect(() => {
    async function carregarAtividades() {
      try {
        const response = await fetchWithAuth(ROUTES(Paths.SHOW_ACTIVITIES));
        const data = await response.json();
  
        if (response.ok) {
          setAtividades(data.dadosAtividades as Atividade[]);
        } else {
          console.error('Erro ao buscar atividades:', data.message);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }

    async function carregarResumoEstatisticas() {
      try {
        const response = await fetchWithAuth(ROUTES(Paths.SHOW_STATS));
        const data = await response.json();

        const ofensiva = data.dadosEstatisticas.ofensiva;

        console.log("Dados de estatísticas recebidos:", data);  // Verifique a estrutura do objeto

        if (response.ok && data.dadosEstatisticas) {
          setResumoEstatisticas({
            ofensiva: data.dadosEstatisticas.ofensiva,
            pontos: data.dadosEstatisticas.pontos
          });
          console.log(ofensiva)
        } else {
          console.error('Erro ao buscar estatísticas:', data.message);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }

    carregarResumoEstatisticas();
    carregarAtividades();
  }, []);  

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <SummaryStats 
          ofensiva={resumoEstatisticas.ofensiva} 
          pontos={resumoEstatisticas.pontos}
        />
      </View>

      <Title title='Atividades' />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {atividades.slice(0, showMore ? atividades.length : 8).map((atividade) => (
          <Activity
            key={atividade.id}
            titulo={atividade.titulo}
            categoria={atividade.categoria}
            pontos={atividade.pontos}
            dificuldade={atividade.dificuldade}
            data={atividade.data}
          />
        ))}
        <TouchableOpacity onPress={handleShowMore}>
          <Text style={styles.verMais}>{showMore ? 'Ver menos' : 'Ver mais...'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


