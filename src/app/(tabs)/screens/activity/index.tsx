import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { FormInput } from "@/src/components/formInput";
import { useCallback, useEffect, useState } from "react";
import { Title } from "@/src/components/title";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { router, useFocusEffect } from "expo-router";
import { SelectDifficulty } from "../../../../components/selectDifficulty";
import { validateFields } from "@/src/utils/validators";
import LoadingScreen from "@/src/components/loadindScreen";
import { carregarResumoEstatisticas } from "@/src/services/api/user";
import { MessageAlert } from "@/src/components/messageAlert";
import ListCategories from "@/src/components/staticListCategories";
import { LoadFont } from "@/src/utils/loadFont";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function AddNewActivity() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [categoria, setCategoria] = useState('');

  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const carregarDados = useCallback(async () => {
      try {
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
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  function handleStartActivity() {
    const fieldsValidate = validateFields({titulo, categoria, dificuldade: selectedDifficulty});

    if (!fieldsValidate.success) {
      setVisible(true);
      setMessage('Os seguintes campos são obrigatórios:\nTítulo, categoria e nível de dificuldade.');
    } else {
      router.navigate({
        pathname: '/(tabs)/pomodoro',
        params: {
          titulo,
          descricao,
          selectedDifficulty, 
          categoria
        },
      });
    }
  }

  const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  function handleDifficultySelect(difficulty: number) {
    setSelectedDifficulty(difficulty);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrool}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled" 
      >
        <SummaryStats
          ofensiva={resumoEstatisticas.ofensiva}
          pontos={resumoEstatisticas.pontos}
        />
        <MessageAlert
          type={1}
          message={message}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
        <Title title="Nova tarefa" />
        <FormInput label="Titulo" value={titulo} onChangeText={setTitulo} />
        <FormInput label="Descrição" value={descricao} onChangeText={setDescricao} isMultiline={true} />
        <SelectDifficulty onDifficultySelect={handleDifficultySelect} selectedDifficulty={selectedDifficulty} />
        <ListCategories setCategoria={setCategoria} />
        <View style={styles.buttonContainer}>
          <SolidButton title="Iniciar" action={handleStartActivity} />
        </View>
      </ScrollView>
    </View>
  );
}
