import { Pressable, Text } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/src/constants/Colors';

interface ButtonProps {
    title: string;
    color?: number;
    action: () => void;
}

export function BorderButton({ title, color, action }: ButtonProps) {
    if(color == undefined){
        color = 1;
    }
    const getColor = (color: number) => {
        switch (color) {
          case 1: return COLORS.WHITE; 
          case 2: return COLORS.ORANGE; 
          default: return COLORS.WHITE;
        }
      };

    return (
        <Pressable onPress={action} style={[styles.registerButton, {
            borderColor: getColor(color)
            }]}>
            <Text style={[styles.registerText, {
                color: getColor(color)
            }]}>{title}</Text>
        </Pressable>
    );
}