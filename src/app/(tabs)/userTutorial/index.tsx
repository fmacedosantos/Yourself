import { RefreshControl, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState, useCallback } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarResumoEstatisticas } from "@/src/services/api/user";
import { MessageAlert } from "@/src/components/messageAlert";
import { LoadFont } from "@/src/utils/loadFont";
import { BackButton } from "@/src/components/backButton";
import { Title } from "@/src/components/title";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function UserTutorial() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0,
  });
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

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
  <BackButton />
  <Title title="Manual do usuário" />
  
  <View style={styles.tutorialContainer}>
  <Text style={styles.tutorialText}>
    Bem-vindo ao tutorial do aplicativo! Aqui está como utilizar cada funcionalidade:
  </Text>
  <View>
    <Text style={styles.tutorialItem}>1. Tela inicial:</Text>
    <Text style={styles.tutorialDescription}>
      - Veja as atividades realizadas nos últimos 2 meses com título, pontos e dificuldade.
    </Text>
    <Text style={styles.tutorialDescription}>
      - Clique em uma atividade para excluí-la após confirmação.
    </Text>

    <Text style={styles.tutorialItem}>2. Tela de criação de atividade:</Text>
    <Text style={styles.tutorialDescription}>
      - Preencha título, dificuldade e categoria e clique em "Iniciar".
    </Text>
    <Text style={styles.tutorialDescription}>
      - Na tela de atividade ativa, acompanhe o timer Pomodoro (concentração e descanso).
    </Text>
    <Text style={styles.tutorialDescription}>
      - Pause/despause ou finalize a atividade (após 1 minuto).
    </Text>

    <Text style={styles.tutorialItem}>3. Tela loja:</Text>
    <Text style={styles.tutorialDescription}>
      - Veja itens colecionáveis disponíveis para compra.
    </Text>
    <Text style={styles.tutorialDescription}>
      - Clique em um item para comprá-lo se tiver pontos suficientes.
    </Text>

    <Text style={styles.tutorialItem}>4. Tela de perfil:</Text>
    <Text style={styles.tutorialDescription}>
      - Veja seu nome, apelido, ano de registro, maior ofensiva, total de pontos e itens adquiridos.
    </Text>
    <Text style={styles.tutorialDescription}>
      - Use os botões para acessar o "Manual do usuário", sair da conta ou alterar configurações.
    </Text>

    <Text style={styles.tutorialItem}>5. Tela de configurações:</Text>
    <Text style={styles.tutorialDescription}>
      - Atualize informações pessoais e preferências do temporizador Pomodoro.
    </Text>
    <Text style={styles.tutorialDescription}>
      - Após atualizar a senha, será necessário fazer login novamente.
    </Text>
  </View>
</View>

  <MessageAlert
    type={1}
    message={message}
    visible={visible}
    onCancel={() => setVisible(false)}
  />
</ScrollView>

    </View>
  );
}
