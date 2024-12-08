import { InputModeOptions, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';

interface FormInputProps {
  label: string;
  placeholder?: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  type?: InputModeOptions  
  isMultiline?: boolean;
}

export function FormInput({ label, placeholder, isPassword, value, onChangeText, type = 'text', isMultiline = false }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>

      <View style={styles.inputContainer}>
        {!isFocused && !value && (
          <Text style={styles.placeholderText}>{placeholder}</Text>
        )}

        <TextInput
          inputMode={type}
          placeholder=""
          secureTextEntry={isPassword}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={isMultiline}
        />
      </View>
    </View>
  );
}


