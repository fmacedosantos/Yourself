import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: COLORS.GRAY,
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInputs: {
    width: '100%',
    marginLeft: '20%',
    marginTop: '20%', 
  },
  editPomodoro: {
    color: COLORS.BLUE, 
    fontFamily: 'Itim-Regular', 
    fontSize: 18, 
    textDecorationLine: 'underline', 
    marginTop: 5
  }
});
