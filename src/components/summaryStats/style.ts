import { COLORS } from '@/src/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        backgroundColor: COLORS.GRAY,
        borderBottomWidth: 3,
        borderBottomColor: COLORS.WHITE
      },
      statItem: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      statValue: {
        marginLeft: 5,
        color: COLORS.WHITE,
        fontSize: 18,
        fontFamily: 'Itim-Regular' 
      },
});