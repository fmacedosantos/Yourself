import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  scrool: {
    flex: 1, 
    backgroundColor: COLORS.GRAY
  },
  buttonContainer: {
    width: '100%', 
    alignItems: 'center'
  }
});
