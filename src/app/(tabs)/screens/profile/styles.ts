import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrool: {
      flex: 1, 
      backgroundColor: COLORS.GRAY
    },
    scrollContainer: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingBottom: 50,
      flexGrow: 1,
    },
    containerInformacoes: {
      marginTop: '25%',
      alignSelf: 'flex-start',
      marginLeft: '5%'
    },
    text: {
      alignSelf: 'flex-start',
      fontSize: 22,  
      marginBottom: 12,
      color: COLORS.WHITE,
      fontFamily: 'Itim-Regular', 
      marginLeft: '5%',
      marginTop: '5%',
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
      width: '100%'
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
    goToTutorialButton: {
      width: '92%',
      marginRight: '1%',
      padding: 10,
    },
    items: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "center", 
      paddingHorizontal: 20,
      paddingTop: 10, 
    },
    noItemsText: {
      color: COLORS.WHITE, 
      textAlign: 'center',
      fontSize: 16,
      marginTop: '35%', 
      fontFamily: 'Itim-Regular'
    }, 
  })
  