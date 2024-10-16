import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        backgroundColor: COLORS.WHITE
      },
      statItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      statValue: {
        marginLeft: 5,
      },
});