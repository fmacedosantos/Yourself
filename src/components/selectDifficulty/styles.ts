import { COLORS } from '@/src/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: "80%",
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, 
    },
    selectedButton: {
        opacity: 0.5,
    },
    buttonDifficulty: {
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 15,
        width: '23%',
        alignItems: 'center'
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 10,
        color: COLORS.WHITE,
        fontFamily: 'Itim-Regular', 
    },
    buttonDifficultyEasy: {
        backgroundColor: COLORS.GREEN
    },
    buttonDifficultyAvarege: {
        backgroundColor: COLORS.ORANGE
    },
    buttonDifficultyHard: {
        backgroundColor: COLORS.RED
    },
    textDifficulty: {
        fontFamily: 'Itim-Regular',
        color: COLORS.WHITE,
        fontSize: 20
    }
});