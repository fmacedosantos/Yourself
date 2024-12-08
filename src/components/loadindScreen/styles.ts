import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.GRAY, 
    },
    loaderBackground: {
      width: 100,
      height: 100,
      backgroundColor: COLORS.GRAY, 
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textLoad: {
      color: COLORS.ORANGE,
      marginBottom: 10,
      fontFamily: 'Itim-Regular',
      fontSize: 18
    }
  });