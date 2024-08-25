import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { useState } from 'react';

import { styles } from './styles';
import { MD3Colors } from 'react-native-paper';
import { COLORS } from '../../constants/colors';

export function ListCategories() {
    const [titleList, setTitleList] = useState('Categorize sua tarefa')
    const [expanded, setExpanded] = useState(false)
  
    const handlePress = () => setExpanded(!expanded);
  
    const categories = {
      1: "Matemática",
      2: "Física"
    }

    const theme = {
      colors: {
        primary: COLORS.WINTER.ICON.RED,
      },
    }

  return (
    <List.Section style={styles.listaContainer}>
        <List.Accordion style={styles.lista} title={titleList}
        expanded={expanded} theme={theme}
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
  );
}