import { RefreshControl, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Link, router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { BestStats } from "@/src/components/bestStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarMelhoresEstatisticas, carregarResumoEstatisticas, carregarUsuario, getItems, logout } from "@/src/services/api/user";
import { Item } from "@/src/components/item";
import { MessageAlert } from "@/src/components/messageAlert";
import { LoadFont } from "@/src/utils/loadFont";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface Informacoes {
  nome: string;
  apelido: string;
  anoRegistro: number;
}

interface MelhoresEstatisticas {
  maiorOfensiva: number;
  totalPontos: number;
}

interface ItemLoja {
  id: string;
  icone: string;
  nome: string;
  preco: number;
}

export default function Profile() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0,
  });
  const [informacoes, setInformacoes] = useState<Informacoes>({
    nome: "",
    apelido: "",
    anoRegistro: 0,
  });
  const [melhoresEstatisticas, setMelhoresEstatisticas] = useState<MelhoresEstatisticas>({
    maiorOfensiva: 0,
    totalPontos: 0,
  });
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [itens, setItens] = useState<ItemLoja[]>([]); 
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const carregarDados = useCallback(async (isRefresh: boolean = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      setLoading(true);
      const {success, message} = await carregarResumoEstatisticas(setResumoEstatisticas);
        if (!success) {
          setMessage(message);
          setVisible(true);
          return;
        }
      await carregarUsuario(setInformacoes);
      await carregarMelhoresEstatisticas(setMelhoresEstatisticas);

      await getItems((userItems) => {
        setItens(userItems);
      });
    } catch {
        setMessage('Erro ao carregar informações.');
        setVisible(true);
    } finally {
        setLoading(false);
        if (isRefresh) setRefreshing(false);
    }
  
  }, []);

  useEffect(() => {
    carregarDados(); 
  }, []); 

  function handleGoToSettings() {
    router.navigate("/(tabs)/confirmPassword");
  }

  function handleGoToTutorial() {
    router.navigate('/(tabs)/userTutorial')
  }

  async function handleLeaveAccount() {
    await logout();
  }

  const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  const handleRefresh = () => {
    carregarDados(true); 
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrool}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
      <SummaryStats ofensiva={resumoEstatisticas.ofensiva} pontos={resumoEstatisticas.pontos} />
      <View style={styles.containerInformacoes}>
        <Text style={styles.nome}>{informacoes.nome}</Text>
        <Text style={styles.apelido}>{informacoes.apelido}</Text>
        <Text style={styles.anoRegistro}>Na plataforma desde {informacoes.anoRegistro}</Text>
      </View>
      <View style={styles.accountContainer}>
        <SolidButton
          title="Configurações"
          action={handleGoToSettings}
          style={styles.settingsButton}
        />
        <SolidButton
          title="Sair da conta"
          action={handleLeaveAccount}
          style={styles.leaveAccountButton}
        />
      </View>
      <SolidButton
        title="Manual do usuário"
        action={handleGoToTutorial}
        style={styles.goToTutorialButton}
      />
      <MessageAlert
        type={1}
        message={message}
        visible={visible}
        onCancel={() => setVisible(false)}
      />

      <BestStats melhorOfensiva={melhoresEstatisticas.maiorOfensiva} totalXp={melhoresEstatisticas.totalPontos} />
      <Text style={styles.text}>Itens Adquiridos</Text>
      <View style={styles.items}>
        {itens.length === 0 ? (
          <Text style={styles.noItemsText}>Nenhum item adquirido...</Text>
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
      </View>
      </ScrollView>
    </View>
  );
}
