import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';
import { COLORS } from '../../constants/colors';

interface inputTextProps{
    label: string
    placeholder: string
    colorUnderline?: string
    isMultilene?: boolean
    numberLines?: number
    style?: any
}

export function TextInputPaper({label, placeholder, colorUnderline = COLORS.WINTER.ICON.RED, 
    isMultilene = false, numberLines = 1, style}: inputTextProps) {
    const [text, setText] = useState('');

    return (
        <TextInput style={[styles.input, style]}
            multiline={isMultilene}
            numberOfLines={numberLines}
            value={text}
            onChangeText={setText}
            label={label}
            placeholder={placeholder}
            activeUnderlineColor={colorUnderline}
            textColor={COLORS.BLACK}
        />
  );
}