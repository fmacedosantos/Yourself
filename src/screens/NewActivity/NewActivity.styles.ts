import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY,
  },
  icon: {
    height: '40%', 
    width: '100%', 
    resizeMode: 'center',
  },
  textTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  textTimer: {
    fontSize: 25,
    marginTop: 10,
    color: COLORS.BLACK,
  }
});