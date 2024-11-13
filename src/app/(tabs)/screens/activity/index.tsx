import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { FormInput } from "@/src/components/formInput";
import { useEffect, useState } from "react";
import { Title } from "@/src/components/title";
import { userService } from "@/src/services/api/user";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { router } from "expo-router";
import { SelectDifficulty } from "../../../../components/selectDifficulty";
import { validateFields } from "@/src/utils/validators";
import LoadingScreen from "@/src/components/loadindScreen";
import { ListCategories } from "../../../../components/ListCategories";

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

  useEffect(() => {
    async function carregarDados() {
      userService.carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false)
    }
    carregarDados();
  }, []);

  function handleStartActivity() {
    if (validateFields({ titulo, categoria, dificuldade: selectedDifficulty })) {
      router.replace({
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

  if (loading) {
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
        <Title title="Nova tarefa" />
        <FormInput label="Titulo" value={titulo} onChangeText={setTitulo} />
        <FormInput label="Descrição" value={descricao} onChangeText={setDescricao} />
        <SelectDifficulty onDifficultySelect={handleDifficultySelect} selectedDifficulty={selectedDifficulty} />
        <ListCategories setCategoria={setCategoria} />
        <View style={styles.buttonContainer}>
          <SolidButton title="Iniciar" action={handleStartActivity} />
        </View>
      </ScrollView>
    </View>
  );
}
