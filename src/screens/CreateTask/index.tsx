import {  Text, View } from 'react-native';

import { styles } from './styles';
import { TextInputPaper } from '../../components/TextInputPaper';
import { SelectDifficulty } from '../../components/SelectDifficulty';
import { ViewSummaryStats } from '../../components/ViewSummaryStats';

import { List } from 'react-native-paper';
import { useState } from 'react';

export function CreateTask({ navigation }: any) {
  const [titleList, setTitleList] = useState('Categoria')
  const [expanded, setExpanded] = useState(false)

  const handlePress = () => setExpanded(!expanded);

  const categories = {
    1: "Matemática",
    2: "Física"
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ViewSummaryStats/>
      <Text onPress={goBack} style={styles.closeView}>Sair</Text>
        <Text style={styles.title}>TAREFA</Text>
        <TextInputPaper label='Título' placeholder='Titule sua tarefa'/>

        <TextInputPaper label='Descrição' placeholder='Descreva sua tarefa' 
        isMultilene={true} numberLines={5}/>
        
        <Text style={styles.label}>Nível de Dificuldade</Text>
        <SelectDifficulty/>

        <List.Section style={styles.listaContainer}>
          <List.Accordion style={styles.lista} title={titleList}
          expanded={expanded}
          onPress={handlePress}>
            <List.Item style={styles.listaItem} title={categories[1]}
            onPress={() => {
              setTitleList(categories[1])
              handlePress()
            }}/>
            <List.Item style={styles.listaItem} title={categories[2]}
            onPress={() => {
              setTitleList(categories[2])
              handlePress()
            }}/>
          </List.Accordion>
        </List.Section>
    </View>

  );
}