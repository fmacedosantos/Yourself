import { Text, View } from "react-native";
import { styles } from "./styles";
import { FormInput } from "@/src/components/formInput";
import { useEffect, useState } from "react";
import { Title } from "@/src/components/title";
import { userService } from "@/src/services/api/user";
import { SummaryStats } from "@/src/components/summaryStats";
import { SolidButton } from "@/src/components/solidButton";
import { router } from "expo-router";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function AddNewActivity() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelDificuldade, setNivelDificuldade] = useState('');
  const [categoria, setCategoria] = useState('');

  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });

  useEffect(() => {
    userService.carregarResumoEstatisticas(setResumoEstatisticas);
  }, []); 

  function handleStartActivity(){
    router.navigate('/(tabs)/pomodoro');
  }

  return (
    <View
      style={styles.container}
    >
      <SummaryStats 
        ofensiva={resumoEstatisticas.ofensiva} 
        pontos={resumoEstatisticas.pontos}
      />
      <Title title="Nova tarefa"/>
      <FormInput label="Titulo" value={titulo} onChangeText={setTitulo}/>
      <FormInput label="Descrição" value={descricao} onChangeText={setDescricao}/>
      <FormInput label="Nível de dificuldade" value={nivelDificuldade} onChangeText={setNivelDificuldade}/>
      <FormInput label="Categoria" value={categoria} onChangeText={setCategoria}/>
      <SolidButton title="Iniciar" action={handleStartActivity}/>
    </View>
  );
}


