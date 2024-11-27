import { Text, View } from "react-native";
import { styles } from "./styles";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { BestStats } from "@/src/components/bestStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarMelhoresEstatisticas, carregarResumoEstatisticas, carregarUsuario, logout } from "@/src/services/api/user";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Informacoes {
  nome: string
  apelido: string
  anoRegistro: number
}

interface MelhoresEstatisticas {
  maiorOfensiva: number;
  totalPontos: number;
}

export default function Profile() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [informacoes, setInformacoes] = useState<Informacoes>({
    nome: '',
    apelido: '',
    anoRegistro: 0
  });
  const [melhoresEstatisticas, setMelhoresEstatisticas] = useState<MelhoresEstatisticas>({
    maiorOfensiva: 0,
    totalPontos: 0
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
       await carregarResumoEstatisticas(setResumoEstatisticas);
       await carregarUsuario(setInformacoes);
       await carregarMelhoresEstatisticas(setMelhoresEstatisticas);
      setLoading(false);
    }
    carregarDados();
  }, []);  

  function handleGoToSettings(){
    router.navigate('/(tabs)/confirmPassword');
  }

  async function handleLeaveAccount(){
    await logout();
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
      <View style={styles.containerInformacoes}>
        <Text style={styles.nome}>{informacoes.nome}</Text>
        <Text style={styles.apelido}>{informacoes.apelido}</Text>
        <Text style={styles.anoRegistro}>Na plataforma desde {informacoes.anoRegistro}</Text>
      </View>
      <View style={styles.accountContainer}>
        <SolidButton title="Configurações" action={handleGoToSettings} style={styles.settingsButton}/>
        <SolidButton title="Sair da conta" action={handleLeaveAccount} style={styles.leaveAccountButton}/>
      </View>

      <BestStats melhorOfensiva={melhoresEstatisticas.maiorOfensiva} totalXp={melhoresEstatisticas.totalPontos}/>
    </View>
  );
}
