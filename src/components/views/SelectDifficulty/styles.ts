import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, 
    },
    buttonDifficulty: {
        borderWidth: 3,
        borderColor: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        paddingVertical: 20,
        width: '23%',
        alignItems: 'center'
    },
      
});