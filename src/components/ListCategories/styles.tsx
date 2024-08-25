import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
    listaContainer:{
        width: '80%',
        marginBottom: 20,
    },
    lista: {
    borderWidth: 3,
    borderColor: COLORS.BLACK,
    },
    listaItem: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 2,
    },
});