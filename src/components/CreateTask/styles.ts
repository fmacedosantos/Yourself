import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY,
  },
  containerScroll: {
    marginTop: '19%',
  },
  containerContentScroll: {
    paddingHorizontal: '10%', 
    paddingVertical: '10%'
  },
  containerHeader: {
    flexDirection: 'row', 
    marginBottom: 30, 
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    paddingHorizontal: '17%',
    color: COLORS.RED,
    fontWeight: '900',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  }
});