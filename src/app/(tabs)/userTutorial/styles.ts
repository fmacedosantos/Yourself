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
      flexGrow: 1,
    },
    tutorialContainer: {
        padding: 20,
        backgroundColor: COLORS.GRAY,
        borderRadius: 10,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
      },
      tutorialText: {
        fontSize: 20,
        color: COLORS.WHITE,
        marginBottom: 10,
        fontFamily: 'Itim-Regular',
      },
      tutorialItem: {
        fontSize: 18,
        color: COLORS.ORANGE,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'Itim-Regular',
      },
      tutorialDescription: {
        fontSize: 16,
        color: COLORS.WHITE,
        marginLeft: 10,
        fontFamily: 'Itim-Regular',
      },
      
  })
  