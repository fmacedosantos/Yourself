import {  Dimensions, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { TextInputPaper } from '../../components/TextInputPaper';
import { SelectDifficulty } from '../../components/views/SelectDifficulty';
import { SummaryStats } from '../../components/views/SummaryStats';
import { ListCategories } from '../../components/ListCategories';
import { RectangularBrowser } from '../../components/buttons/RectangularBrowser';
import { BackScreen } from '../../components/buttons/BackScreen';

export function CreateTask({navigation}: any) {

  return (
      <View style={styles.container}>
        <SummaryStats />

        <ScrollView 
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerContentScroll}>
            <View style={styles.containerHeader}>
              <BackScreen navigation={navigation} />
              <Text style={styles.title}>TAREFA</Text>
            </View>
            <TextInputPaper label="Título" placeholder="Titule sua tarefa" />

            <TextInputPaper label="Descrição" placeholder="Descreva sua tarefa" 
            isMultilene={true} numberLines={5}/>

            <Text style={styles.label}>Nível de Dificuldade</Text>
            <SelectDifficulty />

            <Text style={styles.label}>Categoria</Text>
            
            <ListCategories />
            <RectangularBrowser text="INICIAR"/>
          </View>
        </ScrollView>
      </View>
  );
}