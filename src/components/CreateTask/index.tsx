import {  Dimensions, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { TextInputPaper } from '../TextInputPaper';
import { SelectDifficulty } from '../SelectDifficulty';
import { SummaryStats } from '../SummaryStats';
import { ListCategories } from '../ListCategories';
import { RectangularBrowser } from '../RectangularBrowser';
import { BackScreen } from '../BackScreen';

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
            <RectangularBrowser text="INICIAR"
              onPress={() => {
                navigation.navigate('Pomodoro')
              }}
            />
          </View>
        </ScrollView>
      </View>
  );
}