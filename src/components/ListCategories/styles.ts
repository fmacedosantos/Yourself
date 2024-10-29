import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
    listaContainer:{
        marginBottom: 20,
    },
    lista: {
    borderWidth: 3,
    borderColor: COLORS.BLACK,
    },
    listaItem: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 2,
    },
});