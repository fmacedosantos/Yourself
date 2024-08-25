import {  Text, View } from 'react-native';

import { styles } from './styles';
import { TextInputPaper } from '../../components/TextInputPaper';
import { SelectDifficulty } from '../../components/SelectDifficulty';
import { ViewSummaryStats } from '../../components/ViewSummaryStats';
import { ListCategories } from '../../components/ListCategories';
import { ButtonCreateTask } from '../../components/ButtonCreateTask';

export function CreateTask({ navigation }: any) {

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ViewSummaryStats/>
      <Text onPress={goBack} style={styles.closeView}>Sair</Text>
        <Text style={styles.title}>TAREFA</Text>
        <TextInputPaper label='Título' placeholder='Titule sua tarefa'/>

        <TextInputPaper label='Descrição' placeholder='Descreva sua tarefa' isMultilene={true} numberLines={5}/>
        
        <Text style={styles.label}>Nível de Dificuldade</Text>
        <SelectDifficulty/>

        <Text style={styles.label}>Categoria</Text>
        <ListCategories/>

        <ButtonCreateTask text='INICIAR'/>
    </View>

  );
}