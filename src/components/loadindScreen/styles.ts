import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.GRAY, // Cor do fundo da tela
    },
    loaderBackground: {
      width: 100,
      height: 100,
      backgroundColor: COLORS.GRAY, // Cor do fundo personalizado para o loader
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });