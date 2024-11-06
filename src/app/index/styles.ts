import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  forget: {
    fontSize: 16,
    color: COLORS.ORANGE,
    fontFamily: 'Itim-Regular',
    textDecorationLine: 'underline',
    textAlign: 'center', 
    marginTop: 20, 
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Itim-Regular',
    paddingBottom: 20, 
  },
});