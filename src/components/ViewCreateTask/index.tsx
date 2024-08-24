import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import icon from '../../../assets/pictures/icon.png'
import { COLORS } from '../../constants/colors';
import { TextInputPaper } from '../TextInputPaper';
import { SelectDifficulty } from '../SelectDifficulty';

export function ViewCreateTask({onClose}: any) {

  return (
    <View style={styles.container}>
      <Text onPress={onClose} style={styles.closeView}>Sair</Text>
        <Text style={styles.title}>INICIANDO TAREFA</Text>
        <TextInputPaper label='Título' placeholder='Titule sua tarefa'/>

        <TextInputPaper label='Descrição' placeholder='Descreva sua tarefa' 
        isMultilene={true} numberLines={5}/>
        
        <Text style={styles.label}>Nível de Dificuldade</Text>
        <SelectDifficulty/>
    </View>
  );
}