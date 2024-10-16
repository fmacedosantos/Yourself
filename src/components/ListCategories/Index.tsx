import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { useState } from 'react';

import { styles } from './style';
import { MD3Colors } from 'react-native-paper';
import { COLORS } from '../../constants/Colors';

export function ListCategories({style}: any) {
    const [titleList, setTitleList] = useState('Categorize sua tarefa')
    const [expanded, setExpanded] = useState(false)
  
    const handlePress = () => setExpanded(!expanded);
  
    const categories = {
      1: "Matemática",
      2: "Física",
      3: 'Química',
      4: 'Biologia',
      5: 'Português',
      6: 'História',
      7: 'Geografia',
      8: 'Filosofia',
    }

    const theme = {
      colors: {
        primary: COLORS.RED,
      },
    }

  return (
    <List.Section style={[styles.listaContainer, style]}>
        <List.Accordion style={[styles.lista]} title={titleList}
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
        <List.Item style={styles.listaItem} title={categories[3]}
        onPress={() => {
            setTitleList(categories[3])
            handlePress()
        }}/>
        <List.Item style={styles.listaItem} title={categories[4]}
        onPress={() => {
            setTitleList(categories[4])
            handlePress()
        }}/>
        <List.Item style={styles.listaItem} title={categories[5]}
        onPress={() => {
            setTitleList(categories[5])
            handlePress()
        }}/>
        <List.Item style={styles.listaItem} title={categories[6]}
        onPress={() => {
            setTitleList(categories[6])
            handlePress()
        }}/>
        </List.Accordion>
    </List.Section>
  );
}