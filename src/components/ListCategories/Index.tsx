import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export function ListCategories({ style }: any) {
    const [titleList, setTitleList] = useState('Categoria');
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => setExpanded(!expanded);

    const categories = [
        "Matemática",
        "Física",
        "Química",
        "Biologia",
        "Português",
        "História",
        "Geografia",
        "Filosofia"
    ];

    return (
        <View style={[styles.listaContainer, style]}>
            <TouchableOpacity onPress={handlePress} style={styles.customButton}>
                <Text style={styles.customButtonText}>+ {titleList}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.dropdown}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setTitleList(category);
                                setExpanded(false);
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
