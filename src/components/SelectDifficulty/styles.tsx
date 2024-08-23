import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    containerSelect: {
        flexDirection: 'column',
    },
    buttonDifficulty: {
        borderWidth: 3,
        borderColor: COLORS.BLACK,
        borderRadius: 10,
        paddingVertical: 20,
        width: '23%',
        alignItems: 'center'
    },
      
});