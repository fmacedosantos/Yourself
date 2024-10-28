import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TituloComponent } from '../../../components/Titulo';
import { SummaryStats } from '../../../components/summaryStats';
import { AtividadeComponent } from '../../../components/historico';
import { fetchWithAuth } from '../../../utils/fetchWithAuth';

interface Atividade {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
  data: string;
}

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  useEffect(() => {
    async function carregarAtividades() {
      try {
        const response = await fetchWithAuth('http://192.168.0.229:3000/atividade/mostrar');
        const data = await response.json();
  
        if (response.ok) {
          setAtividades(data.dadosAtividades as Atividade[]); // Cast para Atividade[]
        } else {
          console.error('Erro ao buscar atividades:', data.message);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  
    carregarAtividades();
  }, []);  

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <SummaryStats />
      </View>

      <TituloComponent title='Atividades' />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {atividades.slice(0, showMore ? atividades.length : 3).map((atividade) => (
          <AtividadeComponent
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373435',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  verMais: {
    color: '#00AEEF',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Itim-Regular' 
  },
  summaryContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 0,
  },
});
