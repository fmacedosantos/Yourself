import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
    listaContainer: {
        marginBottom: 20,
        width: '80%',
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: COLORS.WHITE,
    },
    customButtonText: {
        color: COLORS.BLACK,
        fontSize: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        borderRadius: 5,
        backgroundColor: COLORS.WHITE,
        marginTop: 5,
        width: '100%',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BLACK,
    },
    dropdownText: {
        color: COLORS.BLACK,
        fontSize: 16,
    },
});
