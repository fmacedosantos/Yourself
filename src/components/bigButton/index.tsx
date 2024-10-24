import { COLORS } from '@/src/constants/Colors';
import { Pressable, StyleSheet, Text } from 'react-native';

interface primaryButtonProps{
    title: string
    action: () => void
    type: number
}

export function BigButton({title, action, type}: primaryButtonProps) {
    let styles
    if (type == 1) {
        styles = StyleSheet.create({
            button: {
                backgroundColor: COLORS.ORANGE, 
                padding: 15,
                borderRadius: 15,
                alignItems: 'center',
                width: '80%',
                marginVertical: 10
            },
            text: {
                color: COLORS.WHITE,
                fontSize: 18,
                fontFamily: 'Itim-Regular' 
            }
        })
    } else {
        styles = StyleSheet.create({
            button: {
                backgroundColor: 'transparent',
                padding: 15,
                borderRadius: 15,
                borderColor: '#fff',
                borderWidth: 2,
                alignItems: 'center',
                width: '80%',
                marginVertical: 10
            },
            text: {
                color: COLORS.WHITE,
                fontSize: 18,
                fontFamily: 'Itim-Regular' 
            }
        })
    } 
 return (
   <Pressable
        onPress={action}
        style={styles?.button}
   >
        <Text
            style={styles?.text}
        >{title}</Text>
   </Pressable>
  );
}