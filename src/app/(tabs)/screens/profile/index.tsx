import { Text, View } from "react-native";
import { styles } from "./styles";
import { logout } from '@/src/services/api/auth';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { userService } from "@/src/services/api/user";
import { SummaryStats } from "@/src/components/summaryStats";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Informacoes {
  nome: string
  apelido: string
  anoRegistro: number
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
  })

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
    userService.carregarUsuario(setInformacoes);
  }, []);  


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


      <Link href='/(tabs)/settings'>Configurações</Link>
      <Text onPress={logout}>Sair da conta</Text> 
    </View>
  );
}
