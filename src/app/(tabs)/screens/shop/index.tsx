// src/screens/shop/index.tsx
import { ScrollView, View, Text } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarResumoEstatisticas, getAllItems } from "@/src/services/api/user";
import { Title } from "@/src/components/title";
import { Item } from "@/src/components/item";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface ItemLoja {
  id: string;
  icone: string;
  nome: string;
  preco: number;
}

export default function Shop() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0,
  });

  const [itens, setItens] = useState<ItemLoja[]>([]); // Estado para armazenar os itens da loja
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      await carregarResumoEstatisticas(setResumoEstatisticas);
      await getAllItems(setItens); // Carrega os itens da loja
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
        {itens.length === 0 ? (
          <Text style={styles.noItemsText}>Nenhum item disponível...</Text>
        ) : (
          itens.map((item) => (
            <Item
              key={item.id}
              icon={item.icone + ".png"}
              name={item.nome}
              price={item.preco}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
