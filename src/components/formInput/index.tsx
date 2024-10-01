import { COLORS } from '@/src/constants/Colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps{
    label: string
    placeholder: string
    isPassword?: boolean
}

export default function FormInput({label, placeholder, isPassword}: FormInputProps) {
 return (
   <View 
        className='flex justify-center items-center'
        style={styles.container}
   >
        <Text 
            style={styles.text}
        >{label}</Text>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLORS.GRAY}
            secureTextEntry={isPassword}
            style={styles.input}
        />
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 10,
        color: COLORS.WHITE
    },
    input: {
        backgroundColor: COLORS.WHITE, 
        padding: 15,
        borderRadius: 15, 
        fontSize: 16,
        color: COLORS.GRAY,
        width: '100%',
        marginBottom: 10
      },
})