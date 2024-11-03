import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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

  const [isPaused, setIsPaused] = useState(false);
  const [isConcentracao, setIsConcentracao] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [tempoTotalConcentracao, setTempoTotalConcentracao] = useState(0);

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
              setTempoTotalConcentracao((prevTotal) => prevTotal + preferencias.preferenciaConcentracao);
            }
            setIsConcentracao(!isConcentracao);
            return isConcentracao 
              ? preferencias.preferenciaDescanso * 60 
              : preferencias.preferenciaConcentracao * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, isConcentracao, preferencias]);

  const handlePauseUnpauseButton = () => {
    setIsPaused((prev) => !prev);
  };

  const handleFinishActivity = () => {
    const minutosConcentradosNoCicloAtual = isConcentracao
      ? Math.floor((preferencias.preferenciaConcentracao * 60 - timeLeft) / 60)
      : 0;
    
    const tempoTotal = tempoTotalConcentracao + minutosConcentradosNoCicloAtual;
    
    //setTempoTotalConcentracao(tempoTotal);
    
    // Usa o valor calculado diretamente
    userService.cadastrarAtividade(
      String(titulo),
      String(descricao),
      difficultyLevel,
      String(categoria),
      tempoTotal 
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      
      <Title 
        style={{ color: isConcentracao ? COLORS.RED : COLORS.GREEN }} 
        title={isConcentracao ? 'Concentração' : 'Descanso'} 
      />
      
      <Text 
        style={[ styles.timerText, { color: isConcentracao ? COLORS.RED : COLORS.GREEN }]}
      >
        {formatTime(timeLeft)}
      </Text>
    
      <Tomato 
        width={250} 
        height={250} 
      />
      
      <View style={styles.buttonContainer}>
        <PauseUnpauseButton 
          style={{ backgroundColor: isConcentracao ? COLORS.RED : COLORS.GREEN }}
          isPaused={isPaused} 
          action={handlePauseUnpauseButton}
        />
        <FinishActivityButton 
          action={handleFinishActivity} 
        />
      </View>
    </View>
  );
}