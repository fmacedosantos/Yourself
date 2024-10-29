import { Pressable, Text } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
    title: string;
    action: () => void;
}

export function RegisterButton({ title, action }: ButtonProps) {
    return (
        <Pressable onPress={action} style={styles.registerButton}>
            <Text style={styles.registerText}>{title}</Text>
        </Pressable>
    );
}