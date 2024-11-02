import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SummaryStats } from '@/src/components/summaryStats';
import { Title } from '@/src/components/title';
import { PauseUnpauseButton } from '@/src/components/pauseUnpauseButton';
import { FinishActivityButton } from '@/src/components/finishActivityButton';
import { COLORS } from '@/src/constants/Colors';
import Tomato from '../../../assets/images/tomato-icon.svg';
import { userService } from '@/src/services/api/user';
import { styles } from './styles';

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
    pontos: 0,
  });

  const [preferencias, setPreferencias] = useState<Preferencias>({
    preferenciaConcentracao: 0,
    preferenciaDescanso: 0,
  });

  const [isPaused, setIsPaused] = useState(true);
  const [isConcentracao, setIsConcentracao] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [minutosConcentracao, setMinutosConcentracao] = useState(0);

  const difficultyLevel = Number(selectedDifficulty);

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
    userService.carregarPreferencias(setPreferencias);
  }, []);

  useEffect(() => {
    setTimeLeft(preferencias.preferenciaConcentracao * 60);
  }, [preferencias]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (isConcentracao) {
              setMinutosConcentracao((prev) => prev + preferencias.preferenciaConcentracao);
              setTimeLeft(preferencias.preferenciaDescanso * 60);
            } else {
              setTimeLeft(preferencias.preferenciaConcentracao * 60);
            }
            setIsConcentracao(!isConcentracao);
            return isConcentracao ? preferencias.preferenciaDescanso * 60 : preferencias.preferenciaConcentracao * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, isConcentracao, preferencias]);

  const handlePauseUnpauseButton = () => {
    setIsPaused((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
      
      <Title title={isConcentracao ? 'Concentração' : 'Descanso'} />
      <Text style={{ color: COLORS.WHITE, fontSize: 28, fontFamily: 'Itim-Regular', marginBottom: '10%' }}>
        {formatTime(timeLeft)}
      </Text>
    
      <Tomato width={250} height={250} />
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20%' }}>
        <PauseUnpauseButton isPaused={isPaused} action={handlePauseUnpauseButton} />
        <FinishActivityButton action={handlePauseUnpauseButton} />
      </View>
    </View>
  );
}

