import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WINTER.BACKGROUND,
  },
  closeView: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.BLACK,
    color: COLORS.WHITE,
    backgroundColor: COLORS.WINTER.ICON.RED,
  },
  icon: {
    resizeMode: 'center',
    height: 200,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%'
  },
});