import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
    buttonCreateTask: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 40,
        backgroundColor: COLORS.WINTER.ICON.RED
    },
      textCreateTask: {
        color: COLORS.WHITE,
        fontSize: 30,
    }
});