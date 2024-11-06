import { StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { userService } from "@/src/services/api/user";
import { SummaryStats } from "@/src/components/summaryStats";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Shop() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
  }, []);  
  return (
    <View
      style={styles.container}
    >
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <Text>Shop</Text>
    </View>
  );
}


