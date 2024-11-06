import { Text, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { FormInput } from "@/src/components/formInput";
import { useEffect, useState } from "react";
import { Title } from "@/src/components/title";
import { userService } from "@/src/services/api/user";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { router } from "expo-router";
import { SelectDifficulty } from "../../../../components/selectDifficulty";
import { COLORS } from "@/src/constants/Colors";
import { validateFields } from "@/src/utils/validators";
import { ListCategories } from "@/src/components/listCategories/Index";

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

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
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

  function handleDifficultySelect(difficulty: number) {
    setSelectedDifficulty(difficulty);
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.GRAY }} contentContainerStyle={styles.container}>
      <SummaryStats
        ofensiva={resumoEstatisticas.ofensiva}
        pontos={resumoEstatisticas.pontos}
      />
      <Title title="Nova tarefa" />
      <FormInput label="Titulo" value={titulo} onChangeText={setTitulo} />
      <FormInput label="Descrição" value={descricao} onChangeText={setDescricao} />
      <SelectDifficulty onDifficultySelect={handleDifficultySelect} selectedDifficulty={selectedDifficulty} />
      <ListCategories setCategoria={setCategoria} />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <SolidButton title="Iniciar" action={handleStartActivity} />
      </View>
    </ScrollView>
  );
}
