import { InputModeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import Eye from '../../assets/images/eye.svg';
import EyeOff from '../../assets/images/eye-off.svg';
import { COLORS } from '@/src/constants/Colors';

interface FormInputProps {
  label: string;
  placeholder?: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  type?: InputModeOptions;
  isMultiline?: boolean;
}

export function FormInput({
  label,
  placeholder,
  isPassword = false,
  value,
  onChangeText,
  type = 'text',
  isMultiline = false,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>

      <View style={styles.inputContainer}>
        {!isFocused && !value && <Text style={styles.placeholderText}>{placeholder}</Text>}

        <TextInput
          inputMode={type}
          placeholder=""
          secureTextEntry={isPassword && !isPasswordVisible}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={isMultiline}
        />

        {isPassword && isFocused && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <EyeOff width={26} height={26} />
            ) : (
              <Eye width={26} height={26} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
