import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarResumoEstatisticas } from "@/src/services/api/user";
import { Title } from "@/src/components/title";
import { Item } from "@/src/components/item";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Shop() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      await carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SummaryStats
          ofensiva={resumoEstatisticas.ofensiva}
          pontos={resumoEstatisticas.pontos}
        />
        <Title
          title="Loja de itens"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
        <Item icon={"https://i.imgur.com/xDvCgMu.png"} name="Laranja" price={500} />
      </ScrollView>
    </View>
  );
}
