import { Pressable, Text } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
    title: string;
    action: () => void;
}

export function SolidButton({ title, action }: ButtonProps) {
    return (
        <Pressable onPress={action} style={styles.enterButton}>
            <Text style={styles.enterText}>{title}</Text>
        </Pressable>
    );
}