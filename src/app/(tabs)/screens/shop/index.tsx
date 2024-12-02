import { StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarResumoEstatisticas } from "@/src/services/api/user";
import { Title } from "@/src/components/title";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Shop() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
      await carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false)
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }
  return (
    <View
      style={styles.container}
    >
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <Title title="Loja de itens" containerStyle={{ position: 'absolute', top: 0 }} />
    </View>
  );
}


