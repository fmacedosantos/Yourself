import { COLORS } from '@/src/constants/Colors';
import { StyleSheet, Text } from 'react-native';

export function TextIcon() {
 return (
   <Text
    style={styles.text}
   >
    Y🔥ourself
   </Text>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        position: 'absolute',
        top: '10%',
        color: COLORS.WHITE
    }
})