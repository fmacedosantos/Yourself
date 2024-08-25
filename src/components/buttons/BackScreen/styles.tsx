import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    closeView: {
        position: 'absolute',
        textAlign: 'center',
        top: 100,
        left: 20,
        padding: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.BLACK,
        color: COLORS.WHITE,
        backgroundColor: COLORS.WINTER.ICON.RED,
        elevation: 10,
      },
});