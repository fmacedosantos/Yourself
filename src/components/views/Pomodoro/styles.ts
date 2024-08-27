import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.WINTER.BACKGROUND,
      },
      backButton: {
        position: 'absolute',
        top: 80,
        left: 20,
      },
      icon: {
        height: '40%', 
        width: '100%', 
        resizeMode: 'center',
      },
      textTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: COLORS.WINTER.ICON.RED,
      },
      textTimer: {
        fontSize: 25,
        marginTop: 10,
        color: COLORS.BLACK,
      }
});