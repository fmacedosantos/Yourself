import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { SummaryStats } from '@/src/components/summaryStats';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import { useLocalSearchParams } from 'expo-router';
import { Title } from '@/src/components/title';
import Tomato from '../../../assets/images/tomato-icon.svg';
import { PauseUnpauseButton } from '@/src/components/pauseUnpauseButton';
import { FinishActivityButton } from '@/src/components/finishActivityButton';
import { COLORS } from '@/src/constants/Colors';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Preferencias {
  preferenciaConcentracao: number;
  preferenciaDescanso: number;
}

export default function Pomodoro() {
  const { titulo, descricao, selectedDifficulty, categoria } = useLocalSearchParams();
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });

  const [preferencias, setPreferencias] = useState<Preferencias>({
    preferenciaConcentracao: 0,
    preferenciaDescanso: 0
  })

  const difficultyLevel = Number(selectedDifficulty);

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
    userService.carregarPreferencias(setPreferencias);
  }, []);  

  function handlePauseUnpauseButton(){
    console.log("Clicado")
    console.log(`${preferencias.preferenciaConcentracao} \n\n${preferencias.preferenciaDescanso}`)
  }

  return (
    <View style={styles.container}>
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <View style={{
        alignItems: 'center',
        marginBottom: '20%'
      }}>
        <Title title='Concentração'/>
        <Text style={{
          color: COLORS.WHITE,
          fontSize: 28,
          fontFamily: 'Itim-Regular'
        }}>24:57</Text>
      </View>
      <Tomato width={250} height={250}/>
      <View style={{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '20%'
      }}>
        <PauseUnpauseButton isPaused={true} action={handlePauseUnpauseButton}/>
        <FinishActivityButton action={handlePauseUnpauseButton}/>
      </View>
    </View>
  );
}
