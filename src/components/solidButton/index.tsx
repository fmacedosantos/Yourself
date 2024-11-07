import { Pressable, StyleProp, Text, TextStyle } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
    title: string;
    action: () => void;
    style?: StyleProp<TextStyle>;
}

export function SolidButton({ title, action, style }: ButtonProps) {
    return (
        <Pressable onPress={action} style={[styles.enterButton, style]}>
            <Text style={styles.enterText}>{title}</Text>
        </Pressable>
    );
}