import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import AddCategory from '../../assets/images/add-category-icon.svg';
import { styles } from './styles';

export default function ListCategories({ setCategoria, style }: any) {
    const [titleList, setTitleList] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => setExpanded(!expanded);

    const categories = [
        "Estudos",
        "Trabalho",
        "Saúde",
        "Pessoal",
        "Social",
        "Desenvolvimento",
        "Entretenimento"
    ];

    return (
        <View style={[styles.listaContainer, style]}>
            <Text style={styles.text}>Categoria</Text>
            <Pressable onPress={handlePress} style={styles.customButton}>
                {titleList === '' ? (
                    <AddCategory width={25} height={25} /> 
                ) : (
                    <Text style={styles.customButtonText}>{titleList}</Text>
                )}
            </Pressable>
            {expanded && (
                <View style={styles.dropdown}>
                    {categories.map((category, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setTitleList(category);
                                setCategoria(category); 
                                setExpanded(false);
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownText}>{category}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}
