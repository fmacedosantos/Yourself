import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      width: '80%',
    },
    text: {
      alignSelf: 'flex-start',
      fontSize: 18,
      marginBottom: 10,
      color: COLORS.WHITE,
      fontFamily: 'Itim-Regular', 
    },
    placeholderText: {
      position: 'absolute',
      left: 15,
      top: 15,
      color: COLORS.GRAY,
      fontFamily: 'Itim-Regular', 
      fontSize: 18,
      opacity: 70
    },
    input: {
      backgroundColor: COLORS.WHITE,
      padding: 15,
      borderRadius: 15,
      fontSize: 16,
      color: COLORS.GRAY,
      width: '100%',
      marginBottom: 10,
      fontFamily: 'Itim-Regular', 
    },
    inputContainer: {
      position: 'relative',
      width: '100%',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      top: 13,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });