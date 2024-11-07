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
      fontSize: 30,
      color: COLORS.ORANGE,
      marginBottom: 4,
      fontFamily: 'Itim-Regular'
    },
    apelido: {
      fontSize: 20,
      color: COLORS.WHITE,
      marginBottom: 4,
      fontFamily: 'Itim-Regular'
    },
    anoRegistro: {
      fontSize: 20,
      color: COLORS.WHITE,
      marginBottom: 16,
      fontFamily: 'Itim-Regular'
    },
    accountContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    settingsButton: {
      width: '45%',
      padding: 10,
      marginLeft: '3%',
      backgroundColor: COLORS.BLUE
    },
    leaveAccountButton: {
      width: '45%',
      padding: 10,
      marginLeft: '3%',
      backgroundColor: COLORS.RED
    },
  })
  