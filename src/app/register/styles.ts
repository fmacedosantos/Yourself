import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    }
  })