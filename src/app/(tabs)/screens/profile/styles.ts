import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.GRAY,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '25%'
    },
    containerInformacoes: {
      alignSelf: 'flex-start',
      marginLeft: '5%'
    },
    nome: {
      fontSize: 25,
      fontWeight: 'bold',
      color: COLORS.ORANGE,
      marginBottom: 4,
    },
    apelido: {
      fontSize: 16,
      color: COLORS.WHITE,
      marginBottom: 4,
    },
    anoRegistro: {
      fontSize: 16,
      color: COLORS.WHITE,
      marginBottom: 16,
    },
  })
  