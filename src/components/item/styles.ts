import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 20,
      width: 150,
      padding: 16,
      backgroundColor: COLORS.WHITE,
      borderRadius: 8,
      shadowColor: COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    icon: {
      width: 78,
      height: 78,
      marginBottom: 5,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      fontFamily: 'Itim-Regular' 
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      marginLeft: 4,
      fontSize: 16,
      color: COLORS.BLUE,
      fontFamily: 'Itim-Regular' 
    },
  });
