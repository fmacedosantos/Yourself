import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    listaContainer:{
        marginBottom: 20,
        width: '100%'
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