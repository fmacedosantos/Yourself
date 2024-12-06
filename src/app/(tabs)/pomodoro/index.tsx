import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SummaryStats } from '@/src/components/summaryStats';
import { Title } from '@/src/components/title';
import { PauseUnpauseButton } from '@/src/components/pauseUnpauseButton';
import { FinishActivityButton } from '@/src/components/finishActivityButton';
import { COLORS } from '@/src/constants/Colors';
import Tomato from '../../../assets/images/tomato.svg';
import { styles } from './styles';
import { cadastrarAtividade, carregarPreferencias, carregarResumoEstatisticas } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';
import { MessageAlert } from '@/src/components/messageAlert';
import { BackButton } from '@/src/components/backButton';

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
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({ ofensiva: 0, pontos: 0 });
  const [preferencias, setPreferencias] = useState<Preferencias>({ preferenciaConcentracao: 0, preferenciaDescanso: 0 });
  const [loading, setLoading] = useState(true); 
  const [isPaused, setIsPaused] = useState(false);
  const [isConcentracao, setIsConcentracao] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [tempoTotalConcentracao, setTempoTotalConcentracao] = useState(0);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const difficultyLevel = Number(selectedDifficulty);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        await carregarResumoEstatisticas(setResumoEstatisticas);
        await carregarPreferencias(setPreferencias);
      } catch {
        setMessage('Erro ao carregar informações.');
        setVisible(true);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeLeft(preferencias.preferenciaConcentracao * 60);
    }
  }, [loading, preferencias.preferenciaConcentracao]);

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

  async function handleFinishActivity() {
    const minutosConcentradosNoCicloAtual = isConcentracao
      ? Math.floor((preferencias.preferenciaConcentracao * 60 - timeLeft) / 60)
      : 0;
    
    const tempoTotal = tempoTotalConcentracao + minutosConcentradosNoCicloAtual;
    
    if (tempoTotal < 1) {
      setIsPaused(true);
      setMessage('É necessário um tempo de concentração de, no mínimo 1 minuto, para concluir uma atividade.');
      setVisible(true);
      return;
    }
    const {success, message} = await cadastrarAtividade(String(titulo), String(descricao), difficultyLevel, String(categoria), tempoTotal);
    if (success) {
      router.replace('/(tabs)/screens/home');
    } else {
      setIsPaused(true);
      setMessage(message);
      setVisible(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (loading) {
    return <LoadingScreen />; 
  }

  return (
    <View style={styles.container}>
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <BackButton/>
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

      <MessageAlert
        type={1}
        message={message}
        visible={visible}
        onCancel={() => setVisible(false)}
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
