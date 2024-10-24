import { COLORS } from '@/src/constants/Colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

interface FormInputProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function FormInput({ label, placeholder, isPassword, value, onChangeText }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>

      <View style={styles.inputContainer}>
        {!isFocused && !value && (
          <Text style={styles.placeholderText}>{placeholder}</Text>
        )}

        <TextInput
          placeholder=""
          secureTextEntry={isPassword}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.WHITE,
    fontFamily: 'Itim-Regular', 
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  placeholderText: {
    position: 'absolute',
    left: 15,
    top: 15,
    color: COLORS.GRAY,
    fontFamily: 'Itim-Regular', 
    fontSize: 18,
    opacity: 70
  },
  input: {
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    color: COLORS.GRAY,
    width: '100%',
    marginBottom: 10,
    fontFamily: 'Itim-Regular', 
  },
});
