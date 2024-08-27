import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    closeView: {
        textAlign: 'center',
        width: 40,
        height: 30,
        padding: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.BLACK,
        color: COLORS.WHITE,
        backgroundColor: COLORS.WINTER.ICON.RED,
        elevation: 10,
      },
});