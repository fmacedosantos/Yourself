import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.GRAY,
      color: COLORS.WHITE,
      alignItems: 'center'
    },
    buttonContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '20%'
    },
    timerText: {
      color: COLORS.WHITE,
      fontSize: 28,
      fontFamily: 'Itim-Regular',
      marginBottom: '10%'
    },
    text: {
      color: COLORS.RED
    }
  })