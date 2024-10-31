import { Pressable, Text } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
    action: () => void;
}

export function FinishActivityButton({ action }: ButtonProps) {
    return (
        <Pressable onPress={action} style={styles.finishActivityButton}>
             <Text style={styles.finishActivityText}>Finalizar</Text>
        </Pressable>
    );
}