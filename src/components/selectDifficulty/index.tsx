import React from 'react';
import { Alert, Text, Pressable, View } from 'react-native';

import { styles } from './styles';

export function SelectDifficulty({ style, onDifficultySelect, selectedDifficulty }: { style?: any, onDifficultySelect: (difficulty: number) => void, selectedDifficulty: number | null }) {
    const handleDifficultySelect = (difficulty: number) => {
      onDifficultySelect(difficulty);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nível de Dificuldade</Text>
  
        <View style={[styles.containerButtons, style]}>
          <Pressable
            style={[
              styles.buttonDifficulty,
              styles.buttonDifficultyEasy,
              selectedDifficulty === 1 ? styles.selectedButton : null
            ]}
            onPress={() => handleDifficultySelect(1)}
          >
            <Text style={styles.textDifficulty}>I</Text>
          </Pressable>
  
          <Pressable
            style={[
              styles.buttonDifficulty,
              styles.buttonDifficultyAvarege,
              selectedDifficulty === 2 ? styles.selectedButton : null
            ]}
            onPress={() => handleDifficultySelect(2)}
          >
            <Text style={styles.textDifficulty}>II</Text>
          </Pressable>
  
          <Pressable
            style={[
              styles.buttonDifficulty,
              styles.buttonDifficultyHard,
              selectedDifficulty === 3 ? styles.selectedButton : null
            ]}
            onPress={() => handleDifficultySelect(3)}
          >
            <Text style={styles.textDifficulty}>III</Text>
          </Pressable>
        </View>
      </View>
    );
  }