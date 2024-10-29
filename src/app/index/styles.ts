import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    forget: {
      position: 'absolute',
      bottom: '5%',
      fontSize: 16,
      color: COLORS.ORANGE,
      fontFamily: 'Itim-Regular',
      textDecorationLine: 'underline' 
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.GRAY,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Itim-Regular',
    }
  });