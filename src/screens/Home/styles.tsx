import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WINTER.BACKGROUND,
  },
  containerDetails: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: COLORS.WHITE
  },
  containerAchievements: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAchievements: {
    marginLeft: 5,
  }
});