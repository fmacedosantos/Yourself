import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import icon from '../../../assets/pictures/icon.png'
import { COLORS } from '../../constants/colors';
import { TextInputPaper } from '../TextInputPaper';
import { SelectDifficulty } from '../SelectDifficulty';

export function ViewCreateTask() {

  return (
    <View style={styles.container}>
        <Image source={icon} style={styles.icon}/>
        <TextInputPaper label='Título' placeholder='Titule sua tarefa'/>

        <TextInputPaper label='Descrição' placeholder='Descreva sua tarefa' 
        isMultilene={true} numberLines={5}/>
        
        <Text style={styles.label}>Nível de DIficuldade</Text>
        <SelectDifficulty/>
    </View>
  );
}