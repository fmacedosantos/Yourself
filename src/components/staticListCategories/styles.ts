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
        borderColor: COLORS.GRAY,
        borderRadius: 5,
        paddingVertical: 13,
        backgroundColor: COLORS.WHITE,
    },
    customButtonText: {
        color: COLORS.BLACK,
        fontSize: 16,
        fontFamily: 'Itim-Regular'
    },
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        borderRadius: 5,
        backgroundColor: COLORS.WHITE,
        marginTop: 5,
        width: '100%',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY,
    },
    dropdownText: {
        color: COLORS.GRAY,
        fontSize: 18,
        fontFamily: 'Itim-Regular'
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 10,
        color: COLORS.WHITE,
        fontFamily: 'Itim-Regular', 
      },
});
