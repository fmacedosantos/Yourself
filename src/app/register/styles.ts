import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    login: {
        position: 'absolute',
        bottom: '5%',
        color: COLORS.ORANGE
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.GRAY,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backButton: {
      top: 30,
      left: 20
    }
  })